-- MoBeigi Server setup.sql

CREATE DATABASE IF NOT EXISTS mobeigi_server;
USE mobeigi_server;

CREATE TABLE IF NOT EXISTS trades_polygon_dailyopenclose
(
    from_date DATETIME NOT NULL, -- cant use 'from' as its a reserved keyword
    symbol VARCHAR(32) NOT NULL, -- Long enough to cover options symbol length
    has_data BOOLEAN NOT NULL, -- false if from_date falls on holiday or does not exist for some reason, true otherwise
    after_hours DOUBLE,
    close DOUBLE,
    high DOUBLE,
    low DOUBLE,
    open DOUBLE,
    pre_market DOUBLE,
    volume INT,
    PRIMARY KEY (from_date, symbol)
);
