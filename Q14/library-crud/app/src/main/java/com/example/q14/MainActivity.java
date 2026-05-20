package com.example.q14;

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
    EditText idInput = findViewById(R.id.idInput);
    EditText titleInput = findViewById(R.id.titleInput);
    EditText authorInput = findViewById(R.id.authorInput);
    TextView output = findViewById(R.id.output);

    Button createBtn = findViewById(R.id.createBtn);
    Button readBtn = findViewById(R.id.readBtn);
    Button updateBtn = findViewById(R.id.updateBtn);
    Button deleteBtn = findViewById(R.id.deleteBtn);

    createBtn.setOnClickListener(v -> {
      db.createBook(titleInput.getText().toString(), authorInput.getText().toString());
      output.setText("Created");
    });

    readBtn.setOnClickListener(v -> {
      Cursor c = db.readBooks();
      StringBuilder sb = new StringBuilder();
      while (c.moveToNext()) {
        sb.append(c.getInt(0)).append(". ")
          .append(c.getString(1)).append(" - ")
          .append(c.getString(2)).append("\n");
      }
      output.setText(sb.toString());
      c.close();
    });

    updateBtn.setOnClickListener(v -> {
      long id = Long.parseLong(idInput.getText().toString());
      db.updateBook(id, titleInput.getText().toString(), authorInput.getText().toString());
      output.setText("Updated");
    });

    deleteBtn.setOnClickListener(v -> {
      long id = Long.parseLong(idInput.getText().toString());
      db.deleteBook(id);
      output.setText("Deleted");
    });
  }
}
