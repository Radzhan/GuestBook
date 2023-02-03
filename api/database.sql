create schema Office collate utf8mb3_general_ci;

create table location
(
    id                        int auto_increment,
    name                      varchar(200) not null,
    description               text         null,
    constraint location_pk
        primary key (id)
);

create table categories
(
    id          int auto_increment,
    name        varchar(200) not null,
    description text         null,
    constraint categories_pk
        primary key (id)
);

create table object
(
    id          int auto_increment,
    name        varchar(200) not null,
    category_id int          null,
    location_id int          null,
    description text         null,
    image       varchar(100) null,
    constraint object_pk
        primary key (id),
    constraint object_categories_id_fk
        foreign key (category_id) references categories (id)
            on update cascade on delete set null,
    constraint object_location_id_fk
        foreign key (location_id) references location (id)
            on update cascade on delete set null
);

alter table object
    drop foreign key object_categories_id_fk;

alter table object
    add constraint object_categories_id_fk
        foreign key (category_id) references categories (id)
            on update cascade;

alter table object
    drop foreign key object_location_id_fk;

alter table object
    add constraint object_location_id_fk
        foreign key (location_id) references location (id)
            on update cascade;
            
alter table object
    modify category_id int not null;

alter table object
    modify location_id int not null;

INSERT INTO categories (id, name, description) VALUES (1, 'test' , 'description for test categories');
INSERT INTO location (id, name, description) VALUES (1, 'test' , 'description for test location');
INSERT INTO object (id, name, description, category_id, location_id) VALUES (1, 'test' , 'description for test object', '1', '1');