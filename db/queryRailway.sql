create table restaurants (
	id serial primary key,
	name varchar(100) unique not null 
		check (name ~ '^[A-Za-zÁÉÍÓÚáéíóúÑñ ]+$' and char_length(name) > 0),
	creationDate timestamp default current_timestamp,
	type varchar(30) not null
		check (type in (
			'Comida Asiática', 'Comida Rápida', 'Batidos y Helados',
            'Comida Mexicana', 'Postres y Repostería', 'Comida Típica',
            'Comida Griega', 'Comida Italiana', 'Cafetería'
		)),
	thumbnailPath text
);

create table favorite (
	id serial primary key,
	restaurantId integer unique references Restaurants(id) on delete cascade,
	favoriteDate timestamp default current_timestamp
);

create table restaurantMeals (
	id serial primary key,
	restaurantId integer references Restaurants(id) on delete cascade,
	name varchar(150) not null
		check (name ~ '^[A-Za-zÁÉÍÓÚáéíóúÑñ ]+$' and char_length(name) > 0),
	thumbnailpath text,
	price numeric(9,2) not null check (price >= 0),
	unique (restaurantId, name)
);

create table orders (
	id serial primary key,
	restaurantId integer references Restaurants(id) on delete cascade,
	creationDate timestamp default current_timestamp,
	subtotal numeric(9,2) not null check (subtotal >= 0),
	tax numeric(9,2) not null,
	shippingCost numeric(9,2) not null ,
	serviceCost numeric(9,2) not null ,
	total numeric(9,2) not null
);

create table orderMeals (
	id serial primary key,
	orderId integer references Orders(id) on delete cascade,
	mealId integer references RestaurantMeals(id) on delete cascade,
	amount integer not null check (amount between 1 and 10)
);

create or replace function calculateOrderTotal()
returns trigger as $$
begin

	new.tax := round(new.subtotal * 0.13, 2);
	new.shippingCost := round(new.subtotal * 0.10, 2);
    new.serviceCost := round((new.subtotal + new.shippingCost) * 0.10, 2);
	new.total := round(new.subtotal + new.tax + new.shippingCost + new.serviceCost, 2);

    return new;
end;
$$ language plpgsql;

create trigger trgCalculateTotal
before insert or update on Orders
for each row
execute function calculateOrderTotal();

select * from restaurants
select * from favorite
select * from restaurantMeals
select * from orders
select * from ordermeals