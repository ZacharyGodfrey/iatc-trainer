# IATC Trainer

An app for recording practice sessions for the IATC Round 1 competition format

---

## User Input

Scores are recorded using a Google Form [here][google-form].

## Data Storage

Submitted scores are recorded in a Google Sheets document [here][google-sheet].

## Results View

This app is the static web page that displays the captured results of training sessions and the single API endpoint that the page uses to retrieve the Google Sheets data as JSON.

You can view the app [here][app-page].

## Development Notes

### Environment Variables

The following environment variables must be configured when working locally and when deploying to the server.

```
GOOGLE_SHEETS_API_KEY
GOOGLE_SHEETS_DOC_ID
GOOGLE_SHEETS_SHEET_NAME
```

---

[google-form]: https://tbd.com
[google-sheet]: https://tbd.com
[app-page]: https://tbd.com
