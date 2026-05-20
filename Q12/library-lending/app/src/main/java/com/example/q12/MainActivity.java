package com.example.q12;

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
    EditText borrowerInput = findViewById(R.id.borrowerInput);
    TextView output = findViewById(R.id.output);

    Button issueBtn = findViewById(R.id.issueBtn);
    Button returnBtn = findViewById(R.id.returnBtn);
    Button viewBtn = findViewById(R.id.viewBtn);

    issueBtn.setOnClickListener(v -> {
      long id = Long.parseLong(idInput.getText().toString());
      db.issueBook(id, borrowerInput.getText().toString());
      output.setText("Issued");
    });

    returnBtn.setOnClickListener(v -> {
      long id = Long.parseLong(idInput.getText().toString());
      db.returnBook(id);
      output.setText("Returned");
    });

    viewBtn.setOnClickListener(v -> {
      Cursor c = db.getAllBooks();
      StringBuilder sb = new StringBuilder();
      while (c.moveToNext()) {
        sb.append(c.getInt(0)).append(". ")
          .append(c.getString(1)).append(" - ")
          .append(c.getString(3))
          .append(" (")
          .append(c.getString(2))
          .append(")\n");
      }
      output.setText(sb.toString());
      c.close();
    });
  }
}
