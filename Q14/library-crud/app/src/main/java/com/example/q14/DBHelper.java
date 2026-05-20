package com.example.q14;

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
    db.execSQL("CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, author TEXT)");
  }

  @Override
  public void onUpgrade(SQLiteDatabase db, int oldVersion, int newVersion) {
    db.execSQL("DROP TABLE IF EXISTS books");
    onCreate(db);
  }

  public long createBook(String title, String author) {
    SQLiteDatabase db = getWritableDatabase();
    ContentValues cv = new ContentValues();
    cv.put("title", title);
    cv.put("author", author);
    return db.insert("books", null, cv);
  }

  public Cursor readBooks() {
    SQLiteDatabase db = getReadableDatabase();
    return db.rawQuery("SELECT * FROM books", null);
  }

  public int updateBook(long id, String title, String author) {
    SQLiteDatabase db = getWritableDatabase();
    ContentValues cv = new ContentValues();
    cv.put("title", title);
    cv.put("author", author);
    return db.update("books", cv, "id=?", new String[] { String.valueOf(id) });
  }

  public int deleteBook(long id) {
    SQLiteDatabase db = getWritableDatabase();
    return db.delete("books", "id=?", new String[] { String.valueOf(id) });
  }
}
