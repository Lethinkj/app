package com.example.q10;

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
    EditText titleInput = findViewById(R.id.titleInput);
    EditText authorInput = findViewById(R.id.authorInput);
    TextView output = findViewById(R.id.output);

    Button saveBtn = findViewById(R.id.saveBtn);
    Button viewBtn = findViewById(R.id.viewBtn);

    saveBtn.setOnClickListener(v -> {
      db.insertBook(titleInput.getText().toString(), authorInput.getText().toString());
      output.setText("Saved");
    });

    viewBtn.setOnClickListener(v -> {
      Cursor c = db.getAllBooks();
      StringBuilder sb = new StringBuilder();
      while (c.moveToNext()) {
        sb.append(c.getInt(0)).append(". ")
          .append(c.getString(1)).append(" - ")
          .append(c.getString(2)).append("\n");
      }
      output.setText(sb.toString());
      c.close();
    });
  }
}
