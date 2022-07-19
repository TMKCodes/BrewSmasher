<?php

class Account {
  public $db = null;
  public function __construct($location) {
    $this->db = new SQLite3($location);
    $this->db->query("CREATE TABLE IF NOT EXISTS account (id INTEGER PRIMARY KEY, email TEXT, password TEXT);");
    $this->db->query("CREATE TABLE IF NOT EXISTS session (id INTEGER PRIMARY KEY, uid INTEGER, hash TEXT, FOREIGN KEY(uid) REFERENCES account(id));");
  }
  public function __destruct() {
    $this->db->close();
  }
  public function register($email, $passwordA, $passwordB) {
    $email = strtolower($email);
    if(empty($email) || empty($passwordA) || empty($passwordB)) {
      return array("success" => "false", "reason" => "Empty data.");
    }
    if($passwordA != $passwordB) {
      return array("success" => "false", "reason" => "Password mismatch.");
    }
    // Check that account with the given email does not exist yet.
    $stmt = $this->db->prepare("SELECT * FROM account WHERE email = :email;");
    $stmt->bindValue(":email", $email, SQLITE3_TEXT);
    $res = $stmt->execute();
    $nrows = 0;
    while($a = $res->fetchArray()) {
      $nrows++;
    }
    if($nrows > 0) {
      return array("success" => "false", "reason" => "Email exists.");
    }
    // Add the new account to the database
    $password = password_hash($passwordA, PASSWORD_BCRYPT, array("cost" => 12));
    $stmt = $this->db->prepare("INSERT INTO account (email, password) VALUES (:email, :password);");
    $stmt->bindValue(":email", $email, SQLITE3_TEXT);
    $stmt->bindValue(":password", $password, SQLITE3_TEXT);
    $result = $stmt->execute();
    if($result != false) {
      return array("success" => "true");
    } else {
      return array("success" => "false", "Failed to insert to SQLite,");
    }
  }
  public function open_session($email, $password) {
    $email = strtolower($email);
    if(empty($email) || empty($password)) {
      return array("success" => "false", "reason" => "Empty data.");
    }
    // Check that the account exists and password is correct.
    $stmt = $this->db->prepare("SELECT * FROM account WHERE email = :email;");
    $stmt->bindValue(":email", $email, SQLITE3_TEXT);
    $res = $stmt->execute();
    $account = array();
    while($row = $res->fetchArray(SQLITE3_ASSOC)) {
      if(password_verify($password, $row["password"])) {
        $account = $row;
        break;
      }
    }
    if(empty($account)) {
      return array("success" => "false", "reason" => "Could not find account.");
    }
    // Check if session exists by the user. If it does use the same one.
    // Simply to allow multilogin.
    $stmt = $this->db->prepare("SELECT * FROM session WHERE uid = :uid;");
    $stmt->bindValue(":uid", $account['id']);
    $res = $stmt->execute();
    $session = array();
    while($row = $res->fetchArray(SQLITE3_ASSOC)) {
      if($row['uid'] == $account['id']) {
        $session = $row;
        break;
      }
    }
    if(!empty($session)) {
      return array("success" => "true", "uid" => $session['uid'], "hash" => $session['hash']);
    }
    // If the session did not exist. Create a new one.
    $time = time();
    $hash = base64_encode(hash("sha256", $time . "|" . $account['id'] . "|" . $account['password']));
    $stmt = $this->db->prepare("INSERT INTO session (uid, hash) VALUES (:uid, :hash);");
    $stmt->bindValue(":uid", $account['id']);
    $stmt->bindValue(":hash", $hash);
    $res = $stmt->execute();
    if($res == false) {
      return array("success" => "false", "reason" => "Failed to insert to SQLite.");
    } else {
      return array("success" => "true", "uid" => $account['id'], "hash" => $hash);
    }
  }

  public function check_session($session) {

  }

  public function close_session($hash) {
    if(empty($hash)) {
      return array("success" => "false", "reason" => "Empty data.");
    }
    // Simply delete the session from the database when loggin out.
    $stmt = $this->db->prepare("DELETE FROM session WHERE hash = :hash;");
    $stmt->bindValue(":hash", $hash);
    $res = $stmt->execute();
    if($res != false) {
      return array("success" => "true");
    } else {
      return array("success" => "false", "reason" => "Session did not exist or failed to delete.");
    }
  }
}

?>
