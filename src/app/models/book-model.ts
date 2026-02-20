export interface Book {
  id:               number;
  userId:           number;        // legacy field — author ID
  title:            string;
  body:             string;        // book description
  author:           string;
  isbn:             string;
  publisher:        string;
  publishedDate:    string;        // YYYY-MM-DD
  category:         string;
  totalCopies:      number;
  availableCopies:  number;
  issuedCopies:     number;
  position:         string;        // shelf location e.g. "A-101"
  addedDate:        string;
  addedBy:          string;
}