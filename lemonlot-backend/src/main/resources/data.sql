set search_path to public;
drop table if exists transactions;
drop table if exists users;
drop table if exists inventory;

create or replace function update_timestamp() returns trigger
language plpgsql
as
$$
begin
    new.modified = current_timestamp;
    return new;
end;
$$;

create table users (
    user_id serial primary key,
    username varchar(50) unique not null,
    password text not null,
    email varchar(100) unique not null,
    role varchar(20) check (role in ('Customer', 'Salesperson', 'Admin')),
    first_name varchar(50) not null,
    last_name varchar(50) not null,
    phone_number varchar(20),
    address text,
    preferences text,
    created_at timestamp default current_timestamp,
    updated_at timestamp default current_timestamp
);

create table inventory (
    car_id serial primary key,
    make varchar(50) not null,
    model varchar(50) not null,
    year integer not null check (year >= 1886),
    price decimal(10, 2) not null,
    color varchar(30),
    mileage decimal (10, 2),
    status varchar(20) check (status in ('Available', 'Sold', 'Reserved')),
    inventory_count integer not null check (inventory_count >= 0),
    description text,
    image_url varchar(255),
    created_at timestamp default current_timestamp,
    updated_at timestamp default current_timestamp
);

create table transactions (
    user_id integer references users(user_id) on delete set null,
	constraint user_fk
        foreign key(user_id)
        references users(user_id) on delete set null,
    salesperson_id integer references users(user_id) on delete set null,
	constraint salesperson_fk
        foreign key(salesperson_id)
        references users(user_id) on delete set null,
    car_id integer references inventory(car_id) on delete set null,
	constraint car_fk
        foreign key(car_id)
        references inventory(car_id) on delete set null,
    transaction_date timestamp not null,
    amount decimal(10, 2) not null,
    status varchar(20) check (status in ('PENDING', 'COMPLETED', 'CANCELLED')),
    payment_method varchar(50),
    offer_amount decimal(10, 2),
    comments text,
    created_at timestamp default current_timestamp,
    updated_at timestamp default current_timestamp
);

create trigger update_timestamp before update on transactions for each row execute procedure update_timestamp();
create trigger update_timestamp before update on inventory for each row execute procedure update_timestamp();
create trigger update_timestamp before update on users for each row execute procedure update_timestamp();

insert into inventory (make, model, year, price, color, mileage, status, inventory_count, description, image_url) values
    ('Toyota', 'Corolla', 2020, 20000.00, 'Blue', 15000.00, 'Available', 10, 'A reliable and fuel-efficient compact car.', 'http://example.com/images/toyota_corolla_2020.jpg'),
    ('Honda', 'Civic', 2019, 22000.00, 'Red', 12000.00, 'Available', 5, 'A sporty and spacious sedan with advanced features.', 'http://example.com/images/honda_civic_2019.jpg'),
    ('Ford', 'Mustang', 2021, 35000.00, 'Black', 5000.00, 'Sold', 0, 'A high-performance sports car with iconic design.', 'http://example.com/images/ford_mustang_2021.jpg'),
    ('Chevrolet', 'Equinox', 2018, 18000.00, 'Silver', 30000.00, 'Reserved', 2, 'A versatile SUV with plenty of cargo space.', 'http://example.com/images/chevrolet_equinox_2018.jpg'),
    ('Nissan', 'Altima', 2022, 25000.00, 'White', 8000.00, 'Available', 8, 'A modern sedan with advanced safety features.', 'http://example.com/images/nissan_altima_2022.jpg');

select * from inventory;