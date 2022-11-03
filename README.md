# IATC Trainer

An app for recording practice sessions for the IATC Round 1 [competition format][iatf-round1]

[![Netlify Status](https://api.netlify.com/api/v1/badges/675c0dfa-a9a2-42f4-ab81-6df5ba9793d8/deploy-status)](https://app.netlify.com/sites/zg-iatc-trainer/deploys)

---

## User Input

Scores are recorded using a Google Form [here][google-form].

## Data Storage

Submitted scores are recorded in a Google Sheets document [here][google-sheet].

## Results View

This app is the static web page that displays the captured results of training sessions and the single API endpoint that the page uses to retrieve the Google Sheets data as JSON.

You can view the app [here][app-page].

## Development Notes

### Tech Stack

- CSS: [TailwindCSS](https://tailwindcss.com)
- Client-Side JS: [AlpineJS](https://alpinejs.dev)
- Hosting: [Netlify](https://www.netlify.com)

### Environment Variables

The following environment variables must be configured when working locally and when deploying to the server.

```
GOOGLE_SHEETS_API_KEY
GOOGLE_SHEETS_DOC_ID
GOOGLE_SHEETS_SHEET_NAME
```

---

[iatf-round1]: https://internationalaxethrowingfederation.com/round-1-of-the-iatc
[google-form]: https://docs.google.com/forms/d/e/1FAIpQLSfWmTWE95z_oxA_13GvSSKS8aA8vyD3XHSGV0y52O27bCZkyA/viewform?usp=sf_link
[google-sheet]: https://docs.google.com/spreadsheets/d/1wZQt0AIFaokmbVYYIVV65dx5Ty5xxE0xvJc-moip-tY/edit?usp=sharing
[app-page]: https://zg-iatc-trainer.netlify.app