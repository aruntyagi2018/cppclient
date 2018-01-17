export var cardRange = {
  "1": {
    "match": {
      "VISA": ["4"]},
    "range": {}
  },
  "2": {
    "match": {
      "AMEX": ["34", "37"],
      "UPAY": ["62", "88"],
      "DCB": ["36"],
      "DISCOVER": ["65"]},
    "range": {
      "MAST": [["50","55"]],
      "DCB": [["38","39"]]}
  },
  "3": {
    "match": {
      "DCB": ["309"]},
    "range": {
      "DCB": [["300", "305"]],
      "DISCOVER": [["644", "649"]]},
  },
  "4": {
    "match": {
      "DISCOVER": ["6011"],
      "LASER": ["6304","6706","6771","6709"],
      "MAESTRO": ["5018", "5020", "5038", "5612", "5893", "6304", "6759", "6761", "6762", "6763", "0604", "6390"],
      "DANKORT": ["5019"],
      "VELEC": ["4026", "4405", "4508", "4844", "4913", "4917"]},
      "range": {
      "JCB": [["3528", "3589"]]}
  },
  "6":  {
    "match": {
      "VELEC": ["417500"]},
    "range": {
      "DISCOVER": [["622126","622925"]]}
  }
}

export var cardTypeImages = {
   "":"https://fly10.ek.aero/english/images/06_Debit_Credit_Card_tcm233-2064524.png",
   "AMEX" : "https://fly10.ek.aero/english/images/11_Card_American_tcm233-1853591.png",
   "DCB" : "https://fly10.ek.aero/english/images/14_Card_Diners_tcm233-1853590.png",
   "DINERS" : "https://fly10.ek.aero/english/images/14_Card_Diners_tcm233-1853590.png",
   "JCB" : "https://fly10.ek.aero/english/images/25_Card_JCB_tcm233-1853595.png",
   "MAST" : "https://fly10.ek.aero/english/images/mastercard_tcm233-1853592.png",
   "MCI" : "https://fly10.ek.aero/english/images/mastercard_tcm233-1853592.png",
   "MCI CREDIT" : "https://fly10.ek.aero/english/images/mastercard_tcm233-1853592.png",
   "VISA":"https://fly10.ek.aero/english/images/18_Card_Visa_tcm233-1853589.png",
   "VISA CREDIT":"https://fly10.ek.aero/english/images/18_Card_Visa_tcm233-1853589.png",
   "MAESTRO":"https://fly10.emirates.com/english/images/15_Card_Maestro_tcm233-1853596.png"
}

export var CountryInfo = [
        {"id": 0, "Name": "Select Country","Description": " Select country","states" : [] },
        {"id": 1, "Name": "India","Description": " india Description","states" : [{"id": 11, "Name": "UP","Description": " UP Description"},{"id": 12, "Name": "MP","Description": " MP Description"}] },
        {"id": 2, "Name": "UAE","Description": " UAE Description","states" : []},
        {"id": 3, "Name": "USA","Description": " USA Description","states" : [{"id": 11, "Name": "USA1","Description": " USA1 Description"},{"id": 12, "Name": "USA2","Description": " USA2 Description"}]},
        {"id": 4, "Name": "UK","Description": " UK Description","states" : [{"id": 11, "Name": "UK1","Description": " UK1 Description"},{"id": 12, "Name": "UK2","Description": " UK2 Description"}]},
    ];
