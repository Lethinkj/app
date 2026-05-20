package com.example.q11;

import android.database.Cursor;
import android.os.Bundle;
import android.widget.Button;
import android.widget.TextView;
import androidx.appcompat.app.AppCompatActivity;

public class MainActivity extends AppCompatActivity {
  private DBHelper db;
  private TextView output;

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_main);

    db = new DBHelper(this);
    output = findViewById(R.id.output);

    Button availableBtn = findViewById(R.id.availableBtn);
    Button issuedBtn = findViewById(R.id.issuedBtn);
    Button reservedBtn = findViewById(R.id.reservedBtn);

    availableBtn.setOnClickListener(v -> show("available"));
    issuedBtn.setOnClickListener(v -> show("issued"));
    reservedBtn.setOnClickListener(v -> show("reserved"));
  }

  private void show(String status) {
    Cursor c = db.getBooksByStatus(status);
    StringBuilder sb = new StringBuilder();
    while (c.moveToNext()) {
      sb.append(c.getInt(0)).append(". ").append(c.getString(1)).append("\n");
    }
    output.setText(sb.length() == 0 ? "No books" : sb.toString());
    c.close();
  }
}
