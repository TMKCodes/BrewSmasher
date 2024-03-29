<?php

class Upvote {
    public $db = null;
    public function __construct($location) {
      $this->db = new SQLite3($location);
      $this->db->query("CREATE TABLE IF NOT EXISTS upvotes (id INTEGER PRIMARY KEY, rip INTEGER, sender INTEGER, FOREIGN KEY(rip) REFERENCES recipe(id), FOREIGN KEY(sender) REFERENCES account(id));");
    }

    public function add($recipe, $sender) {
      $result = $this->checkVote($recipe, $sender);
      if($result['voted'] == "false") {
        $stmt = $this->db->prepare("INSERT INTO upvotes (rip, sender) VALUES (:rip, :sender);");
        $stmt->bindValue(":rip", $recipe);
        $stmt->bindValue(":sender", $sender);
        $res = $stmt->execute();
        if($res != false) {
          return array("success" => "true");
        } else {
          return array("success" => "false", "error" => "Failed to add upvote");
        }
      }
      return array("success" => "false", "error" => "User has already voted the recipe.");
    }

    public function checkVote($recipe, $sender) {
      $stmt = $this->db->prepare("SELECT * FROM upvotes WHERE rip = :recipe AND sender = :sender;");
      $stmt->bindValue(":recipe", $recipe);
      $stmt->bindValue(":sender", $sender);
      $res = $stmt->execute();
      $nrows = 0;
      while ($res->fetchArray()) {
        $nrows++;
      }
      if($nrows > 0) {
        return array("success" => "true", "voted" => "true");
      } else {
        return array("success" => "true", "voted" => "false");
      }
    }

    public function getVotes($recipe) {
      $stmt = $this->db->prepare("SELECT * FROM upvotes WHERE rip = :recipe;");
      $stmt->bindValue(":recipe", $recipe);
      $res = $stmt->execute();
      $count = 0;
      while($row = $res->fetchArray()) {
        if($row['rip'] == $recipe) {
          $count++;
        }
      }
      return array("success" => "true", "count" => $count);
    }

    public function remove($recipe, $sender) {
      $stmt = $this->db->prepare("DELETE FROM upvotes WHERE rip = :recipe AND sender = :sender;");
      $stmt->bindValue(":recipe", $recipe);
      $stmt->bindValue(":sender", $sender);
      $res = $stmt->execute();
      if($res == null) {
        return array("success" => "false", "reason" => "Database query failed.");
      } else {
        return array("success" => "true");
      }
    }
}

?>
