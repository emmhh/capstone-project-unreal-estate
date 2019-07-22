--DROP TABLE advertising_property;

CREATE TABLE "advertising_property"
(
	"address" text, 
	"latitude" float,
	"longitude" float,
	"num_guests" integer,
	"description" text,
	"space" text,
	"name" text,
	"building_type" text,
	"features" text [],
	"price" float, 
	"owner_id" integer,
	"images" text [],
	"num_bathrooms" integer,
	"num_beds" integer,
	"num_rooms" integer,
	"location" geometry(Point,4326),
	"avg_rating" float,
	"booking_ids" integer [],
	"rating_ids" integer []
)

WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;


INSERT INTO "advertising_property" ("property_id", "address", "latitude", "longitude", "numGuests", "description", "name", "buildingType", "price", "features", "owner_id", "images", "numBathrooms", "numBeds", "numRooms")
SELECT "id", "street", CAST("latitude" AS float), CAST("longitude" AS float), "accommodates", "description", "name", "property_type", CAST(replace(RIGHT("price", LENGTH("price") - 1),',','') AS float), CAST("amenities" AS text []), "host_id", CAST(string_to_array("picture_url", ' ') AS text []), "bathrooms", "beds", "bedrooms" 
FROM properties_csv;

ALTER table "advertising_property" add column "location" geometry(Point,4326);
UPDATE "advertising_property" SET "location" = ST_SetSRID(ST_MakePoint(longitude, latitude), 4326);

ALTER table "advertising_property" drop column latitude, drop column longitude;