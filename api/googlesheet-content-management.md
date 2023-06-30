# Google Sheet Online Content Management

## Steps
- Set up Google Sheet based on the sample Google Sheet with API key (or use OAuth)
- Add new Google Sheet config (API key, sheet id, sheet name) to file “api/GoogleSheet.js”
- Add logic to load data from Google Sheet (auto refresh data) when have internet connection, if not retrieve data from JSON file (“assets/data_en.json”) directly
    - Can be in “screens/Home.js” useEffect()
    - Might have trigger for user to decide whether they want to auto refresh data when there is internet (for internet data saving)
- When load data, instead of dispatch to set data (“api/DataContext.js” function loadGoogleSheetData), replace data in JSON file (“assets/data_en.json”), then the app continue to load from JSON file like normal for cases don’t have internet

## Reference
- Sample Google Sheet: Excel sheet attached in the Developer doc
- Sample code reference: https://medium.com/ibjects/simplest-approach-to-build-a-react-native-app-with-google-sheets-api-3f3f89a20079 
- Google Sheet API details: https://developers.google.com/sheets/api/guides/concepts 