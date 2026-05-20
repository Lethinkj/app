package com.example.q12;

import android.content.ContentValues;
import android.content.Context;
import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteOpenHelper;

public class DBHelper extends SQLiteOpenHelper {
  private static final String DB_NAME = "library.db";
  private static final int DB_VERSION = 1;

  public DBHelper(Context context) {
    super(context, DB_NAME, null, DB_VERSION);
  }

  @Override
  public void onCreate(SQLiteDatabase db) {
    db.execSQL(
      "CREATE TABLE books (" +
      "id INTEGER PRIMARY KEY AUTOINCREMENT," +
      "title TEXT," +
      "borrower TEXT," +
      "status TEXT)"
    );
  }

  @Override
  public void onUpgrade(SQLiteDatabase db, int oldVersion, int newVersion) {
    db.execSQL("DROP TABLE IF EXISTS books");
    onCreate(db);
  }

  public int issueBook(long id, String borrower) {
    SQLiteDatabase db = getWritableDatabase();
    ContentValues cv = new ContentValues();
    cv.put("borrower", borrower);
    cv.put("status", "issued");
    return db.update("books", cv, "id=?", new String[] { String.valueOf(id) });
  }

  public int returnBook(long id) {
    SQLiteDatabase db = getWritableDatabase();
    ContentValues cv = new ContentValues();
    cv.put("borrower", "");
    cv.put("status", "available");
    return db.update("books", cv, "id=?", new String[] { String.valueOf(id) });
  }

  public Cursor getAllBooks() {
    SQLiteDatabase db = getReadableDatabase();
    return db.rawQuery("SELECT * FROM books", null);
  }
}
