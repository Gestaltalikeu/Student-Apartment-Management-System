# Student Apartment Management System



A property management application built with Spring Boot, Vue 3, and MySQL. The system organizes resident and property records, maintenance requests, complaints, and billing information.



### Technology Stack



\- Backend: Java, Spring Boot, MyBatis / MyBatis-Plus

\- Frontend: Vue 3, Element Plus

\- Database: MySQL



### Key Features



##### SQL Aggregation and Reporting APIs

Reusable endpoints provide record counts, grouped totals, and summary statistics using SQL aggregation functions. Date-based aggregation supports daily, monthly, and yearly totals.



##### Maintenance and Complaint Tracking

Separate workflows capture submission timestamps, review statuses, and staff responses. Administrators can filter requests by review status and search maintenance requests by maintenance type.



##### Billing Entry and Validation

Property lookups populate resident and property details. Form validation checks required fields and numeric inputs, while billing totals are calculated from property management, heating, and utility fees.



### Repository Structure



\- `manage\_code/`: Vue 3 frontend

\- `server\_code/`: Spring Boot backend



### Configuration



Database credentials are read from the following environment variables:



\- `DB\_USERNAME`

\- `DB\_PASSWORD`



Baidu integrations require:



\- `BAIDU\_APP\_ID`

\- `BAIDU\_API\_KEY`

\- `BAIDU\_SECRET\_KEY`



Local frontend environment files and the original database scripts are excluded from this repository. Running the application requires a separately configured database schema and frontend environment.



### Scope



This repository contains operational workflows and backend aggregation capabilities. It does not currently include a Tableau dashboard, hourly monitoring, automated SLA alerts, or measured operational improvements.

