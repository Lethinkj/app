package com.example.q13;

import android.database.Cursor;
import android.os.Bundle;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;
import androidx.appcompat.app.AppCompatActivity;

public class MainActivity extends AppCompatActivity {
  private DBHelper db;

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_main);

    db = new DBHelper(this);
    EditText studentName = findViewById(R.id.studentName);
    EditText studentDept = findViewById(R.id.studentDept);
    EditText bookTitle = findViewById(R.id.bookTitle);
    EditText bookAuthor = findViewById(R.id.bookAuthor);
    TextView output = findViewById(R.id.output);

    Button addStudentBtn = findViewById(R.id.addStudentBtn);
    Button addBookBtn = findViewById(R.id.addBookBtn);
    Button viewBtn = findViewById(R.id.viewBtn);

    addStudentBtn.setOnClickListener(v -> {
      db.addStudent(studentName.getText().toString(), studentDept.getText().toString());
      output.setText("Student saved");
    });

    addBookBtn.setOnClickListener(v -> {
      db.addBook(bookTitle.getText().toString(), bookAuthor.getText().toString());
      output.setText("Book saved");
    });

    viewBtn.setOnClickListener(v -> {
      StringBuilder sb = new StringBuilder();
      Cursor sc = db.getStudents();
      sb.append("Students:\n");
      while (sc.moveToNext()) {
        sb.append(sc.getInt(0)).append(". ")
          .append(sc.getString(1)).append(" (")
          .append(sc.getString(2)).append(")\n");
      }
      sc.close();

      Cursor bc = db.getBooks();
      sb.append("\nBooks:\n");
      while (bc.moveToNext()) {
        sb.append(bc.getInt(0)).append(". ")
          .append(bc.getString(1)).append(" - ")
          .append(bc.getString(2)).append("\n");
      }
      bc.close();

      output.setText(sb.toString());
    });
  }
}
