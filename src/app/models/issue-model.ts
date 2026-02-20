import { Book } from "./book-model";

export interface Issue {
  id:           number;
  bookId:       number;
  userId:       number;
  issueDate:    string;                    // ISO 8601
  dueDate:      string;                    // ISO 8601
  returnDate:   string | null;
  status:       'issued' | 'returned';
  renewalCount:   number;                    // max 2
  fineAmount:         number;
  finePaid:     boolean;
  daysUntilDue: number;                    // negative when overdue
  isOverdue:    boolean;
  book?:        Pick<Book, 'id' | 'title' | 'author' | 'isbn'>;  // populated in GET /api/issues/my
}

export interface BookDetails {
  id: number;
  title: string;
  author: string;
  isbn: string;
}

export interface UserDetails {
  id: number;
  username: string;
  fullName: string;
}

export interface IssuedBookRecord {
  id: number;                // The record ID (e.g., 1000)
  bookId: number;            // The ID of the book itself
  userId: number;            // The ID of the user
  issueDate: string;         // ISO 8601 Date
  dueDate: string;           // ISO 8601 Date
  returnDate: string | null; // Can be null
  status: string;            // e.g., "issued"
  renewalCount: number;
  maxRenewals: number;
  fineAmount: number;
  finePaid: boolean;
  issuedBy: string;
  notes: string;
  returnedTo: string | null;
  book: BookDetails;         // Nested object
  user: UserDetails;         // Nested object
}