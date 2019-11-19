/*
Éste trigger impide todo insert o update directo en la superclase usuario no haya sido insertado previamente en alguna de las subclases.
*/

create or replace function comprueba_usuario_subclase() returns trigger as $$
DECLARE
	prueba_docente RECORD;
	prueba_soporte RECORD;
	prueba_estudiante RECORD;
BEGIN
	select into prueba_docente * from docente where carnet_docente=new.carnet;
	select into prueba_soporte * from soporte where carnet_soporte=new.carnet;
	select into prueba_estudiante * from estudiante where carnet_estudiante=new.carnet;
	if (prueba_docente.carnet_docente is null and prueba_soporte.carnet_soporte is null and prueba_estudiante.carnet_estudiante is null)
		then
			raise exception 'El usuario % no está introducido en ninguna subclase',new.carnet;
	else
		return new;
	end if;
END;
$$ LANGUAGE plpgsql;

create trigger usuario_en_subclase before insert or update on usuario for each row execute procedure comprueba_usuario_subclase();

/*
Éste trigger elimina automaticamente de la superclase si se elimina el usuario de una subclase
*/

create or replace function borrar_usuario_superclase() returns trigger as $$
BEGIN
	if TG_RELNAME = 'docente' then
		delete from usuario where carnet=old.carnet_docente;
		raise notice 'Al borrar a % de % lo hemos borrado como usuario',old.carnet_docente,TG_RELNAME;
		return old;
	elseif TG_RELNAME = 'soporte' then
		delete from usuario where carnet=old.carnet_soporte;
		raise notice 'Al borrar a % de % lo hemos borrado como usuario',old.carnet_soporte,TG_RELNAME;
		return old;
	else
		delete from usuario where carnet=old.carnet_estudiante;
		raise notice 'Al borrar a % de % lo hemos borrado como usuario',old.carnet_estudiante,TG_RELNAME;
		return old;
	end if;
END;
$$ LANGUAGE plpgsql;

create trigger borrar_usuario_docente after delete on docente for each row execute procedure borrar_usuario_superclase();
create trigger borrar_usuario_soporte after delete on soporte for each row execute procedure borrar_usuario_superclase();
create trigger borrar_usuario_estudiante after delete on estudiante for each row execute procedure borrar_usuario_superclase();

/*
Éste trigger evita que exista el mismo objeto en más de una subclase
*/

create or replace function usuario_ya_esta_en_otra_subclase() returns trigger as $$
DECLARE
	prueba_docente RECORD;
	prueba_soporte RECORD;
	prueba_estudiante RECORD;
BEGIN
	if TG_RELNAME = 'docente' then
		select into prueba_soporte * from soporte where carnet_soporte=new.carnet_docente;
		if (prueba_soporte.carnet_soporte is not null) then
			raise exception 'El usuario % ya pertenece a soporte',new.carnet_docente;
		end if;
		select into prueba_estudiante * from estudiante where carnet_estudiante=new.carnet_docente;
		if (prueba_estudiante.carnet_estudiante is not null) then
			raise exception 'El usuario % ya pertenece a estudiante',new.carnet_docente;
		end if;
	elseif TG_RELNAME = 'soporte' then
		select into prueba_docente * from docente where carnet_docente=new.carnet_soporte;
		if (prueba_docente.carnet_docente is not null) then
			raise exception 'El usuario % ya pertenece a docente',new.carnet_soporte;
		end if;
		select into prueba_estudiante * from estudiante where carnet_estudiante=new.carnet_soporte;
		if (prueba_estudiante.carnet_estudiante is not null) then
			raise exception 'El usuario % ya pertenece a estudiante',new.carnet_soporte;
		end if;
	else
		select into prueba_docente * from docente where carnet_docente=new.carnet_estudiante;
		if (prueba_docente.carnet_docente is not null) then
			raise exception 'El usuario % ya pertenece a docente',new.carnet_estudiante;
		end if;
		select into prueba_soporte * from soporte where carnet_soporte=new.carnet_estudiante;
		if (prueba_soporte.carnet_soporte is not null) then
			raise exception 'El usuario % ya pertenece a soporte',new.carnet_estudiante;
		end if;
	end if;
	return new;
END;
$$ LANGUAGE plpgsql;

create trigger usuario_docente_repetido before insert or update on docente for each row execute procedure usuario_ya_esta_en_otra_subclase();
create trigger usuario_soporte_repetido before insert or update on soporte for each row execute procedure usuario_ya_esta_en_otra_subclase();
create trigger usuario_estudiante_repetido before insert or update on estudiante for each row execute procedure usuario_ya_esta_en_otra_subclase();

/*
Éste trigger verifica que un docente solo pueda hacer reservas de las materias que imparte y un estudiante solo puede hacer reservas de materias que cursa.
*/

create or replace function comprueba_docente_materias() returns trigger as $$
DECLARE
	usuario_tipo RECORD;
	docente_materias RECORD;
	estudiante_materias RECORD;
BEGIN
	select into usuario_tipo * from usuario where carnet=new.responsable_carnet;
	if (usuario_tipo.tipo = 'docente') then
		select into docente_materias * from imparte where carnet_docente=new.responsable_carnet and codigo_materia=new.codigo_materia;
		if (docente_materias.carnet_docente is null and docente_materias.codigo_materia is null) then
			raise exception 'El docente % no imparte la materia %.',new.responsable_carnet,new.codigo_materia;
		end if;
	elseif (usuario_tipo.tipo = 'estudiante') then
		select into estudiante_materias * from (select * from estudiante inner join carrera on estudiante.carrera_codigo=carrera.codigo inner join materiaxcarrera on carrera.codigo=materiaxcarrera.codigo_carrera) as estudiante_record where carnet_estudiante=new.responsable_carnet and codigo_materia=new.codigo_materia;
		if (estudiante_materias.carnet_estudiante is null and estudiante_materias.codigo_materia is null) then
			raise exception 'El estudiante % no cursa la materia %.',new.responsable_carnet,new.codigo_materia;
		end if;
	end if;
	return new;
END;
$$ LANGUAGE plpgsql;

create trigger docente_no_imparte_materia before insert or update on solicitud for each row execute procedure comprueba_docente_materias();

/*
ESTAS SON PRUEBAS PARA EL TRIGGER QUE CONTROLA LAS RESERVAS DEPENDIENDO DE LA MATERIA

--insert materiaxcarrera
insert into materiaxcarrera values ('00IGAII','013V8');

-- prueba para docentes
insert into solicitud values ('02','ninguno','19-11-2019','19-11-2019','13:30:00','15:30:00','18-11-2019','pendiente','00132718','4528','013V8');

-- prueba para estudiantes
BEGIN;

SET CONSTRAINTS fk_estudiante_usuario DEFERRED;
SET CONSTRAINTS fk_estudiante_carrera DEFERRED;

insert into estudiante values ('00132718','00IGAII');
insert into usuario values ('00132718','luis chavez','00132718@uca.edu.sv','warptonic','usuario','estudiante');
insert into carrera values ('00IGAII','ing. informatica');

COMMIT;
*/
