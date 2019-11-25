\c template1

drop database if exists reserva_lab;

create database reserva_lab;

\c reserva_lab

drop DOMAIN if exists email;
create DOMAIN email as varchar(200) check (value ~ '^\d{8}@(uca\.edu\.sv)|[a-z]+@(uca\.edu\.sv)$');

drop table if exists usuario cascade;
create table usuario (
	carnet varchar(8) not null,
	nombre text not null,
	correo email not null, 
	contra text not null,
	rol boolean not null, 
	estado boolean not null,
	tipo text  not null check (tipo in ('docente', 'soporte', 'estudiante'))
);

drop table if exists docente cascade;
create table docente(
	carnet_docente varchar(8) not null
);

drop table if exists soporte cascade;
create table soporte(
	carnet_soporte varchar(8) not null
);

drop table if exists materia cascade;
create table materia(
	codigo text not null, 
	nombre text not null,
	uv int not null,
	correlativo text not null
);

drop table if exists imparte cascade;
create table imparte(
	carnet_docente varchar(8) not null,
	codigo_materia text not null
);

drop table if exists carrera cascade;
create table carrera(
	codigo text not null,
	nombre text not null
);

drop table if exists estudiante cascade;
create table estudiante(
	carnet_estudiante varchar(8) not null,
	carrera_codigo text not null
);

drop table if exists materiaxcarrera cascade;
create table materiaxcarrera(
	codigo_carrera text not null,
	codigo_materia text not null
);

drop table if exists laboratorio cascade;
create table laboratorio(
	codigo int not null,
	nombre text not null, 
	capacidad int not null
);

drop table if exists solicitud cascade;
create table solicitud(
	id serial null,
	equipo text,
	fecha_inicio date not null,
	fecha_fin date not null,
	hora_inicio time not null,
	hora_fin time not null,
	fecha_solicitud date not null,
	estado text not null check (estado in ('pendiente', 'confirmada', 'rechazada')),
	responsable_carnet varchar(8) not null,
	codigo_laboratorio int not null,
	codigo_materia text not null
);

drop table if exists mantenimiento cascade;
create table mantenimiento(
	carnet_soporte varchar(8) not null,
	codigo_laboratorio int not null,
	fecha_inicio date not null,
	fecha_fin date not null,
	hora_inicio time not null, 
	hora_fin time not null
);

--ALTER TABLE DE USUARIO
alter table usuario add constraint pk_usuario primary key (carnet);

--ALTER TABLE DE DOCENTE
alter table docente add constraint pk_docente primary key (carnet_docente);
alter table docente add constraint fk_docente_usuario foreign key (carnet_docente) references usuario(carnet) on delete cascade on update cascade deferrable;

--ALTER TABLE DE SOPORTE
alter table soporte add constraint pk_soporte primary key (carnet_soporte);
alter table soporte add constraint fk_soporte_usuario foreign key (carnet_soporte) references usuario(carnet) on delete cascade on update cascade deferrable;

-- ALTER TABLE DE MATERIA
alter table materia add constraint pk_materia primary key (codigo);

--ALTER TABLE DE IMPARTE
alter table imparte add constraint pk_imparte primary key (carnet_docente,codigo_materia);
alter table imparte add constraint fk_imparte_docente foreign key (carnet_docente) references docente(carnet_docente) on delete cascade on update cascade;
alter table imparte add constraint fk_imparte_materia foreign key (codigo_materia) references materia(codigo) on delete cascade on update cascade;

--ALER TABLE DE CARRERA
alter table carrera add constraint pk_carrera primary key (codigo);

--ALTER TABLE DE ESTUDIANTE
alter table estudiante add constraint pk_estudiante primary key (carnet_estudiante);
alter table estudiante add constraint fk_estudiante_usuario foreign key (carnet_estudiante) references usuario(carnet) on delete cascade on update cascade deferrable;
alter table estudiante add constraint fk_estudiante_carrera foreign key (carrera_codigo) references carrera(codigo) on delete cascade on update cascade deferrable;

--ALTER TABLE DE MATERIAXCARRERA
alter table materiaxcarrera add constraint pk_materiaxcarrera primary key (codigo_carrera,codigo_materia);
alter table materiaxcarrera add constraint fk_materiaxcarrera_carrera foreign key (codigo_carrera) references carrera(codigo) on delete cascade on update cascade;
alter table materiaxcarrera add constraint fk_materiaxcarrera_materia foreign key (codigo_materia) references materia(codigo) on delete cascade on update cascade;

--ALTER TABLE DE LABORATORIO
alter table laboratorio add constraint pk_laboratorio primary key (codigo);

--ALTER TABLE DE SOLICITUD
alter table solicitud add constraint pk_solicitud primary key (id);
alter table solicitud add constraint fk_solicitud_usuario foreign key (responsable_carnet) references usuario(carnet) on delete cascade on update cascade;
alter table solicitud add constraint fk_solicitud_laboratorio foreign key (codigo_laboratorio) references laboratorio(codigo) on delete cascade on update cascade;
alter table solicitud add constraint fk_solicitud_materia foreign key (codigo_materia) references materia(codigo) on delete cascade on update cascade;

--ALTER TABLE DE MANTENIMIENTO
alter table mantenimiento add constraint pk_mantenimiento primary key (carnet_soporte,codigo_laboratorio);
alter table mantenimiento add constraint fk_mantenimiento_soporte foreign key (carnet_soporte) references soporte(carnet_soporte) on delete cascade on update cascade;
alter table mantenimiento add constraint fk_mantenimiento_laboratorio foreign key (codigo_laboratorio) references laboratorio(codigo) on delete cascade on update cascade;