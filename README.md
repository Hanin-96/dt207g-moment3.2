# DT207G - Moment 3.2 - API
Detta repository innehåller kod för ett enklare REST API byggt med Express. APIet är byggt för att hantera olika CV som kan hämtas samt läggas till mha formulär på en webbplats. Grundläggande funktionalitet för CRUD (Create, Read, Update, Delete) är implementerad.
## API Länk
En liveversion av APIet finns tillgänglig på följande URL: https://dt207g-moment3-2-data.onrender.com/cv

## Databas
APIet använder NoSQL MongoDB och Mongose. Databasen innehåller följande struktur på data som skapas i ett schema i ramverket Mongoose:

```
    job_title: {
        type: String,
        required: [true, "Du måste lägga till Jobb titel"]
    },
    company_name: {
        type: String,
        required: [true, "Du måste lägga till Företag"]
    },
    location: {
        type: String,
        required: [true, "Du måste lägga till Ort"]
    },
    description: {
        type: String,
        required: false
    }
```

## Användning av CRUD

| Metod   | Ändpunkt     | Beskrivning                       |
| ------- | ------------ | --------------------------------- |
| GET     | /cv          | Hämtar alla CV                   |
| GET     | /cv/:cvId    | Hämtar CV med specifikt ID       |
| POST    | /cv          | Lagrar nytt CV i databasen       |
| PUT     | cv/:cvId     | Uppdaterar existerande CV med angivet ID |
| DELETE  | cv/:cvId     | Raderar CV med angivet ID        |

cvId är objektets id i string format

*Ett CV-objekt returneras/skickas som JSON med följande struktur:*

```
{
    "_id": "6627e7f6ea7d90329377d549",
    "job_title": "UX designer",
    "company_name": "Verisure",
    "location": "Malmö",
    "description": "Skapade wireframes för Mina sidor i appen",
    "__v": 0
}
  ```
