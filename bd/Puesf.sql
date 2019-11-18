drop table if exists usuario;
create table usuario (
	carnet varchar(8) primary key not null,
	correo text, 
	contra text,
	rol text, 
	tipo text 
);



drop table if exists Docente;
create table Docente(
	carnet varchar(8) primary key not null references usuario(carnet) 
);


drop table if exists soporte;
create table soporte(
	carnet varchar(8) primary key not null references usuario(carnet) 
);

drop table if exists materia;
create table materia(
	codigo text primary key not null, 
	nombre text,
	uv int,
	correlativo text
);


drop table if exists imparte;
create table imparte(
	carnet varchar(8) primary key not null references docente(carnet),
	codigo text not null references materia(codigo)
);

drop table if exists carrera;
create table carrera(
	codigo text primary key not null,
	nombre text
);

drop table if exists estudiante;
create table estudiante(
	carnet varchar(8) primary key not null references usuario(carnet),
	carrera_codigo text references carrera(codigo)
);


drop table if exists materiaxcarrera;
create table materiaxcarrera(
	codigo_carrera text primary key not null references carrera(codigo),
	codigo_materia text not null references materia(codigo)
);



drop table if exists laboratorio;
create table laboratorio(
	codigo int primary key not null,
	nombre text, 
	capacidad int
);

drop table if exists solicitud;
create table solicitud(
	id text primary key not null,
	equipo text,
	fecha_inicio date,
	fecha_fin date,
	hora_inicio time, 
	hora_fin time,
	fecha_solicitud date,
	estado text,
	responsable_carnet varchar(8) not null references usuario(carnet),
	laboratorio_fk int not null references laboratorio(codigo),
	codigo_materia text not null references materia(codigo)
);

drop table if exists mantenimiento;
create table mantenimiento(
	carnet_soporte varchar(8)not null references soporte(carnet),
	codigo_lab int not null references laboratorio(codigo),
	fecha_inicio date,
	fecha_fin date,
	hora_inicio time, 
	hora_fin time
);



