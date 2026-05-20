package com.example.q13;

import android.content.ContentValues;
import android.content.Context;
import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteOpenHelper;

public class DBHelper extends SQLiteOpenHelper {
  private static final String DB_NAME = "records.db";
  private static final int DB_VERSION = 1;

  public DBHelper(Context context) {
    super(context, DB_NAME, null, DB_VERSION);
  }

  @Override
  public void onCreate(SQLiteDatabase db) {
    db.execSQL("CREATE TABLE students (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, dept TEXT)");
    db.execSQL("CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, author TEXT)");
  }

  @Override
  public void onUpgrade(SQLiteDatabase db, int oldVersion, int newVersion) {
    db.execSQL("DROP TABLE IF EXISTS students");
    db.execSQL("DROP TABLE IF EXISTS books");
    onCreate(db);
  }

  public long addStudent(String name, String dept) {
    SQLiteDatabase db = getWritableDatabase();
    ContentValues cv = new ContentValues();
    cv.put("name", name);
    cv.put("dept", dept);
    return db.insert("students", null, cv);
  }

  public long addBook(String title, String author) {
    SQLiteDatabase db = getWritableDatabase();
    ContentValues cv = new ContentValues();
    cv.put("title", title);
    cv.put("author", author);
    return db.insert("books", null, cv);
  }

  public Cursor getStudents() {
    SQLiteDatabase db = getReadableDatabase();
    return db.rawQuery("SELECT * FROM students", null);
  }

  public Cursor getBooks() {
    SQLiteDatabase db = getReadableDatabase();
    return db.rawQuery("SELECT * FROM books", null);
  }
}
