create schema Ofice collate utf8mb3_general_ci;

create table `location`
(
    id                        int auto_increment,
    name                      varchar(200) not null,
    `description of location` text         null,
    constraint `location _pk`
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