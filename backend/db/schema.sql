CREATE TABLE "Users" (
	"userId" serial PRIMARY KEY,
	"username" varchar(120) NOT NULL UNIQUE,
	"email" varchar(255) NOT NULL UNIQUE,
	"fullName" varchar(255),
	"imageURL" varchar(255),
	"backgroundURL" varchar(255),
	"location" varchar(80),
	"company" varchar(120),
	"website" varchar(255),
	"bio" text,
	"isAdmin" boolean DEFAULT FALSE,
	"createdAt" timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
	"updatedAt" timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "AuthProviders" (
	"providerId" smallserial PRIMARY KEY,
	"providerName" varchar(60) NOT NULL UNIQUE
);

CREATE TABLE "Auths" (
	"authId" serial PRIMARY KEY,
	"userId" int NOT NULL REFERENCES "Users" ON DELETE CASCADE,
	"authProviderId" smallint NOT NULL REFERENCES "AuthProviders" ON DELETE CASCADE,
	"password" varchar(100)
);

CREATE TABLE "RefreshSessions" (
	"tokenId" bigserial PRIMARY KEY,
	"userId" int NOT NULL REFERENCES "Users" ON DELETE CASCADE,
	"refreshToken" uuid NOT NULL UNIQUE,
	"userAgent" varchar(255) NOT NULL,
	"fingerprint" varchar(200) NOT NULL,
	"expiresIn" bigint NOT NULL,
	"createdAt" timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "Tags" (
	"tagId" smallserial PRIMARY KEY,
	"tagName" varchar(80) NOT NULL UNIQUE
);

CREATE TABLE "TagSubscriptions" (
	"subscriberId" int REFERENCES "Users" ON DELETE CASCADE,
	"tagId" smallint REFERENCES "Tags",
	PRIMARY KEY("subscriberId", "tagId")
);

CREATE TABLE "Followers" (
	"followedId" int REFERENCES "Users" ON DELETE CASCADE,
	"followerId" int REFERENCES "Users" ON DELETE CASCADE,
	PRIMARY KEY("followedId", "followerId")
);

CREATE TABLE "Posts" (
	"postId" bigserial PRIMARY KEY,
	"authorId" int NOT NULL REFERENCES "Users" ON DELETE CASCADE,
	"title" varchar(255) NOT NULL,
	"content" jsonb NOT NULL,
	"isPublic" boolean DEFAULT TRUE,
	"createdAt" timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
	"updatedAt" timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "Bookmarks" (
	"userId" int REFERENCES "Users" ON DELETE CASCADE,
	"postId" bigint REFERENCES "Posts" ON DELETE CASCADE,
	PRIMARY KEY("userId", "postId")
);

CREATE TABLE "PostTags" (
	"postId" bigint REFERENCES "Posts" ON DELETE CASCADE,
	"tagId" int REFERENCES "Tags",
	PRIMARY KEY("postId", "tagId")
);

CREATE TABLE "PostScores" (
	"userId" int REFERENCES "Users" ON DELETE CASCADE,
	"postId" bigint REFERENCES "Posts" ON DELETE CASCADE,
	"score" smallint DEFAULT 0,
	PRIMARY KEY("userId", "postId")
);

CREATE TABLE "Comments" (
	"commentId" bigserial PRIMARY KEY,
	"postId" bigint NOT NULL REFERENCES "Posts" ON DELETE CASCADE,
	"authorId" int NOT NULL REFERENCES "Users" ON DELETE CASCADE,
	"parentId" bigint REFERENCES "Comments" ON DELETE CASCADE,
	"rawContent" text NOT NULL,
	"postedAt" timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
	"updatedAt" timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP
);
