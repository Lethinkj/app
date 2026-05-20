package com.example.q9;

import android.database.Cursor;
import android.os.Bundle;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;
import androidx.appcompat.app.AppCompatActivity;

public class MainActivity extends AppCompatActivity {
  private DBHelper db;
  private EditText idInput, titleInput, authorInput, yearInput;
  private TextView output;

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_main);

    db = new DBHelper(this);
    idInput = findViewById(R.id.idInput);
    titleInput = findViewById(R.id.titleInput);
    authorInput = findViewById(R.id.authorInput);
    yearInput = findViewById(R.id.yearInput);
    output = findViewById(R.id.output);

    Button addBtn = findViewById(R.id.addBtn);
    Button updateBtn = findViewById(R.id.updateBtn);
    Button deleteBtn = findViewById(R.id.deleteBtn);
    Button viewBtn = findViewById(R.id.viewBtn);

    addBtn.setOnClickListener(v -> {
      db.insertBook(titleInput.getText().toString(), authorInput.getText().toString(),
        Integer.parseInt(yearInput.getText().toString()));
      output.setText("Inserted");
    });

    updateBtn.setOnClickListener(v -> {
      long id = Long.parseLong(idInput.getText().toString());
      db.updateBook(id, titleInput.getText().toString(), authorInput.getText().toString(),
        Integer.parseInt(yearInput.getText().toString()));
      output.setText("Updated");
    });

    deleteBtn.setOnClickListener(v -> {
      long id = Long.parseLong(idInput.getText().toString());
      db.deleteBook(id);
      output.setText("Deleted");
    });

    viewBtn.setOnClickListener(v -> {
      Cursor c = db.getAllBooks();
      StringBuilder sb = new StringBuilder();
      while (c.moveToNext()) {
        sb.append(c.getInt(0))
          .append(" - ")
          .append(c.getString(1))
          .append(" by ")
          .append(c.getString(2))
          .append(" (")
          .append(c.getInt(3))
          .append(")\n");
      }
      output.setText(sb.toString());
      c.close();
    });
  }
}
