package com.example.q11;

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
      "status TEXT)"
    );
  }

  @Override
  public void onUpgrade(SQLiteDatabase db, int oldVersion, int newVersion) {
    db.execSQL("DROP TABLE IF EXISTS books");
    onCreate(db);
  }

  public long insertBook(String title, String status) {
    SQLiteDatabase db = getWritableDatabase();
    ContentValues cv = new ContentValues();
    cv.put("title", title);
    cv.put("status", status);
    return db.insert("books", null, cv);
  }

  public Cursor getBooksByStatus(String status) {
    SQLiteDatabase db = getReadableDatabase();
    return db.rawQuery("SELECT * FROM books WHERE status=?", new String[] { status });
  }
}
