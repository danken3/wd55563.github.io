create table post
(
    id      integer not null
        constraint post_pk
            primary key autoincrement,
    subject text not null,
    content text not null
);

create table game (
  id INTEGER not null constraint book_pk primary key autoincrement,
  title TEXT not null,
  author TEXT not null
);