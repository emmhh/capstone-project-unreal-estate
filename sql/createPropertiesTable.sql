--DROP TABLE advertising_property;

CREATE TABLE "advertising_property"
(
	"property_id" integer PRIMARY KEY,
	"address" text, 
	"latitude" float,
	"longitude" float,
	"numGuests" integer,
	"description" text,
	"name" text,
	"buildingType" text,
	"features" text [],
	"price" float, 
	"owner_id" integer,
	"images" text [],
	"numBathrooms" integer,
	"numBeds" integer,
	"numRooms" integer
)

WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;


INSERT INTO "advertising_property" ("property_id", "address", "latitude", "longitude", "numGuests", "description", "name", "buildingType", "price", "features", "owner_id", "images", "numBathrooms", "numBeds", "numRooms")
SELECT "id", "street", CAST("latitude" AS float), CAST("longitude" AS float), "accommodates", "description", "name", "property_type", CAST(replace(RIGHT("price", LENGTH("price") - 1),',','') AS float), CAST("amenities" AS text []), "host_id", CAST(string_to_array("picture_url", ' ') AS text []), "bathrooms", "beds", "bedrooms" FROM csv_table;

ALTER table "advertising_property" add column "location" geometry(Point,4326);
UPDATE "advertising_property" SET "location" = ST_SetSRID(ST_MakePoint(longitude, latitude), 4326);

ALTER table "advertising_property" drop column latitude, drop column longitude;