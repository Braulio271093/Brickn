drop database if exists projecte;
create database projecte;
use projecte;

create table usuari (
	id int(6) unsigned primary key auto_increment,
	nomUsuari VARCHAR(50) not null unique,
    pass VARCHAR(16) not null,
    clau VARCHAR(16) not null, 
    respostaPregunta VARCHAR(30) not NULL,
    fotoPerfil VARCHAR(100) default '/imgServer/fotosPerfil/nofoto.png'
);
/*insert into usuari (nomUsuari, email, pass, respostaPregunta) VALUES ('pau', 'pau', '123', 'Barcelona');*/

create table tema (
	id int(6) unsigned primary key auto_increment,
    nom varchar(30) not null 
    );

create table usuari_tema (
	idUsuari INT(6) unsigned,
    idTema INT(6) unsigned,
    PRIMARY KEY (idUsuari, idTema),
    FOREIGN KEY (idUsuari) REFERENCES usuari(id) ON DELETE CASCADE,
    FOREIGN KEY (idTema) REFERENCES tema(id) ON DELETE CASCADE
    );
    
create table usuari_contacte (
	idUsuari1 INT(6) unsigned,
    idUsuari2 INT(6) unsigned,
    acceptat BOOLEAN not null default 0,
    PRIMARY KEY (idUsuari1, idUsuari2), 
    FOREIGN KEY (idUsuari1) REFERENCES usuari(id) ON DELETE CASCADE,
    FOREIGN KEY (idUsuari2) REFERENCES usuari(id) ON DELETE CASCADE
);

create table grup (
    id INT(6) unsigned primary key auto_increment,
    nom VARCHAR(50) not null,
    tipus BOOLEAN not null default 1, /* 1 = privat, 0 = public */
    pass VARCHAR(16) default 0,
    foto VARCHAR(100) default '/imgServer/fotosGrup/nofoto.png' 
    );

create table usuari_grup ( 
    idUsuari INT(6) unsigned not null,
    idGrup INT(6) unsigned not null,
    admin BOOLEAN default 0, /* 1 = es admin; 0 = no es admin */
    ultimaEntrada DATETIME, 
    PRIMARY KEY (idUsuari, idGrup),
    FOREIGN KEY (idUsuari) REFERENCES usuari(id) ON DELETE CASCADE,
    FOREIGN KEY (idGrup) REFERENCES grup(id) ON DELETE CASCADE
    );

create table grup_tema (
    idGrup INT(6) unsigned,
    idTema INT(6) unsigned,
    FOREIGN KEY (idGrup) REFERENCES grup(id) ON DELETE CASCADE,
    FOREIGN KEY (idTema) REFERENCES tema(id) ON DELETE CASCADE
);

create table grup_publicacions ( /* publicacions i events */
    id INT(6) unsigned PRIMARY KEY auto_increment,
    idGrup INT(6) unsigned,
    idUsuari INT(6) unsigned not null,
    tipus TINYINT(1) unsigned not null default 0, /* 0 = text, 1 = imatge, 2 = event */
    dataPublicacio DATETIME not null,
    FOREIGN KEY (idGrup) REFERENCES grup(id) ON DELETE CASCADE,
    FOREIGN KEY (idUsuari) REFERENCES usuari(id) ON DELETE CASCADE
);

create table publicacio (
    id INT(6) unsigned PRIMARY KEY not null,
    publicacio VARCHAR(300) not null,
    FOREIGN KEY (id) REFERENCES grup_publicacions(id) ON DELETE CASCADE
);

create table event (
    id INT(6) unsigned PRIMARY KEY auto_increment,
    nom VARCHAR(50) not null,
    descripcio VARCHAR(120) not null,
    dateStart DATETIME not null,
    dateEnd DATETIME not null,
    coordX INT(6) default 0,
    coordY INT(6) default 0,
    icon VARCHAR(50) default 0,
    FOREIGN KEY (id) REFERENCES grup_publicacions(id) ON DELETE CASCADE
);

create table usuari_event (
    idUsuari INT(6) unsigned NOT NULL,
    idEvent INT(6) unsigned NOT NULL,
    acceptat BOOLEAN not null default 0,
    PRIMARY KEY(idUsuari, idEvent),
    FOREIGN KEY (idUsuari) REFERENCES usuari(id) ON DELETE CASCADE,
    FOREIGN KEY (idEvent) REFERENCES event(id) ON DELETE CASCADE
);


create table comentari (
    idPublicacio INT(6) unsigned,
    idUsuari INT(6) unsigned not null,
    comentari VARCHAR(200) not null, 
    dataComentari DATETIME not null,
    FOREIGN KEY (idPublicacio) REFERENCES grup_publicacions(id) ON DELETE CASCADE, 
    FOREIGN KEY (idUsuari) REFERENCES usuari(id) ON DELETE CASCADE
);

