
<!doctype html>
<html lang="en">
<head>
  <!-- Global site tag (gtag.js) - Google Analytics -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=UA-160990370-1"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());

    gtag('config', 'UA-160990370-1');
  </script>
  <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2582273507218133"
     crossorigin="anonymous"></script>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
  <link rel="stylesheet" href="https://bootswatch.com/4/darkly/bootstrap.css" />
  <!--
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous" />
  -->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/Wruczek/Bootstrap-Cookie-Alert@gh-pages/cookiealert.css">
  <link rel="stylesheet" href="style.css" />
  <title>Brewsmashing</title>
</head>
<body>
  <div id="img-popover">
    <div class="button-container">
      <button type="button" id="img-popover-close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="image-container">
      <img src="" id="picture" />
    </div>
  </div>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark" id="login-navbar">
    <a class="navbar-brand home-navbar-button">Brewsmashing</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#login-navbar-content" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="login-navbar-content">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item">
          <a class="nav-link" id="register-navbar-button">Register</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" id="login-navbar-button">Login</a>
        </li>
      </ul>
    </div>
  </nav>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark" id="logged-navbar"  style="display: none;">
    <a class="navbar-brand home-navbar-button">Brewsmashing</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#logged-navbar-content" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="logged-navbar-content" style="display: hidden">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Ingredients
          </a>
          <div class="dropdown-menu" aria-labelledby="navbarDropdown">
            <a class="dropdown-item" id="addfermentable-navbar-button">Add Fermentable</a>
            <a class="dropdown-item" id="search-fermentable-navbar-button">Browse Fermentable</a>
            <div class="dropdown-divider"></div>
            <a class="dropdown-item" id="addhops-navbar-button">Add Hops</a>
            <a class="dropdown-item" id="search-hops-navbar-button">Browse Hops</a>
            <div class="dropdown-divider"></div>
            <a class="dropdown-item" id="addyeast-navbar-button">Add Yeast</a>
            <a class="dropdown-item" id="search-yeast-navbar-button">Browse Yeasts</a>
            <div class="dropdown-divider"></div>
            <a class="dropdown-item" id="addmisc-navbar-button">Add Other</a>
            <a class="dropdown-item" id="search-misc-navbar-button">Browse Others</a>
          </div>
        </li>
        <li class="nav-item dropdown" style="display: none;">
          <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Storage
          </a>
          <div class="dropdown-menu" aria-labelledby="navbarDropdown">
            <a class="dropdown-item" id="add-ingredient-to-storage-navbar-button">Add ingredient</a>
              <a class="dropdown-item" id="browse-ingredients-in-storage-navbar-button">Browse your ingredient</a>
            <div class="dropdown-divider"></div>
            <a class="dropdown-item" id="add-equipment-to-storage-navbar-button">Add equipment</a>
              <a class="dropdown-item" id="browse-equipments-in-storage-navbar-button">Browse your equipment</a>
          </div>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Planning
          </a>
          <div class="dropdown-menu" aria-labelledby="navbarDropdown">
            <a class="dropdown-item" id="add-new-recipe-navbar-button">Add new recipe</a>
            <a class="dropdown-item" id="browse-your-recipes-navbar-button">Browse your recipes</a>
            <a class="dropdown-item" id="browse-other-recipes-navbar-button">Browse public recipes</a>
            <div class="dropdown-divider"></div>
            <a class="dropdown-item" id="add-new-water-navbar-button" style="display: none;">Add new water profile</a>
            <a class="dropdown-item" id="browse-your-waters-navbar-button" style="display: none;">Browse your water profile</a>
          </div>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Brewing
          </a>
          <div class="dropdown-menu" aria-labelledby="navbarDropdown">
            <a class="dropdown-item" id="startbrew-navbar-button">Start brewing</a>
            <a class="dropdown-item" id="readlog-navbar-button">Brewlog</a>
          </div>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Community
          </a>
          <div class="dropdown-menu" aria-labelledby="navbarDropdown">
            <a class="dropdown-item" id="code" href="https://github.com/TMKCodes/BrewSmasher">Code</a>
            <a class="dropdown-item" id="project" href="https://github.com/TMKCodes/BrewSmasher/projects/1">Project</a>
          </div>
        </li>
        <li class="nav-item dropdown"  style="display: none;">
          <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Tools
          </a>
          <div class="dropdown-menu" aria-labelledby="navbarDropdown">
            <a class="dropdown-item" id="import-beer-xml">Import BeerXML v1.0</a>
            <a class="dropdown-item" id="lovebond-to-ebc">Lovebond to EBC</a>
          </div>
        </li>
        <li class="nav-item">
          <a class="nav-link" id="logout-navbar-button">Logout</a>
        </li>
      </ul>
    </div>
  </nav>
  <div class="alert text-center cookiealert" role="alert">
    <b>Do you like cookies?</b> We use cookies to ensure you get the best experience on our website. <a href="https://cookiesandyou.com/" target="_blank">Learn more</a>
    <button type="button" class="btn btn-primary btn-sm acceptcookies" aria-label="Close">I agree</button>
  </div>
  <div class="container-fluid content" id="home-content">
    <div class="centered-content" style="display:hidden">
      <div class="alert alert-success" role="alert" id="register-success" style="display: none;">
        Now please feel free to log in. We do not not require you to confirm your email, so it is up to you that it was correct.
      </div>
    </div>
    <div class="jumbotron centered-content home-page" style="display:hidden">
      <h1 class="display-4">Welcome</h1>
      <p class="lead">This is a place meant for Craft Brewers.</p>
      <hr class="my-4">
      <p>As a Craft Brewer you can create your recipes, keep brewing log and share your data to others. So if this is a tool for you, it is free to use.</p>
      <p>There are ton of ingredients and you can even add them yourself if some of them are missing. Recipe creation, saving and calculations for you!  </p>
      <img src="res/ingredients.png" class="img-thumbnail" style="width: 200px; height: 310px;" />
      <img src="res/recipe-creation.png" class="img-thumbnail" style="width: 200px; height: 310px;"/>
      <img src="res/hoppidy.png" class="img-thumbnail" style="width: 200px; height: 310px;"/>
    </div>
    <div class="jumbotron centered-content home-page" style="display:hidden">
      <h1 class="display-4">© 2021 - Xorfork Solutions</h1>
      <p class="lead">Really done for us, but we realized we can give this free for you to use too. So be happy and brew at home!</p>
    </div>
  </div>

  <?php require_once("ingredients.html"); ?>
  <?php require_once("recipes.html"); ?>
  <?php require_once("brewing.html"); ?>

  <div class="container-fluid content" Id="login-content" style="display: none;">
    <form id="login-form" class="centered-content" method="POST" action="server.php">
      <h2>Login</h2>
      <div class="form-group">
        <label for="Lemail">Email address:</label>
        <input type="email" class="form-control" id="Lemail" name="email" />
      </div>
      <div class="form-group">
        <label for="passwordC">Password:</label>
        <input type="password" class="form-control" id="passwordC" name="password" />
      </div>
      <div class="alert alert-danger" role="alert" id="empty-email-error" style="display: none;">
        Email is empty.
      </div>
      <div class="alert alert-danger" role="alert" id="empty-password-error" style="display: none;">
        Password is empty.
      </div>
      <div class="alert alert-danger" role="alert" id="failed-to-login-error" style="display: none;">
        The email address or password you provided does not match any accounts in our system.
      </div>
      <input type="hidden" name="request" value="open-session" />
      <button type="submit" class="btn btn-primary" id="login-button">login</button>
    </form>
  </div>
  <div class="container-fluid content" id="register-content" style="display: none;">
    <form id="register-form" class="centered-content" method="POST" action="server.php">
      <h2>Registeration</h2>
      <div class="form-group">
        <label for="email">Email address:</label>
        <input type="email" class="form-control" id="email" name="email" aria-describedby="emailHelp">
        <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
      </div>
      <div class="form-group">
        <label for="passwordA">Password:</label>
        <input type="password" class="form-control" id="passwordA" name="passwordA"/>
      </div>
      <div class="form-group">
        <label for="passwordB">Password confirm:</label>
        <input type="password" class="form-control" id="passwordB" name="passwordB"/>
      </div>
      <div class="alert alert-danger" role="alert" id="empty-email-error" style="display: none;">
        Email is empty.
      </div>
      <div class="alert alert-danger" role="alert" id="empty-passwordA-error" style="display: none;">
        Password is empty.
      </div>
      <div class="alert alert-danger" role="alert" id="empty-passwordB-error" style="display: none;">
        Password confirm is empty.
      </div>
      <div class="alert alert-danger" role="alert" id="password-mismatch-error" style="display: none;">
        Passwords do not match.
      </div>
      <div class="alert alert-danger" role="alert" id="failed-to-register-error" style="display: none;">
        Failed to register for some unknown reason, please contact us if you continue having problems.
      </div>
      <input type="hidden" name="request" value="register" />
      <button type="submit" class="btn btn-primary" id="register-button">Register</button>
    </form>
  </div>
  <script src="https://cdn.jsdelivr.net/npm/js-cookie@rc/dist/js.cookie.min.js"></script>
  <script src="https://code.jquery.com/jquery-3.4.1.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
  <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js" integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6" crossorigin="anonymous"></script>
  <script src="https://cdn.jsdelivr.net/gh/Wruczek/Bootstrap-Cookie-Alert@gh-pages/cookiealert.js"></script>
  <script src="ingredients.js"></script>
  <script src="recipes.js"></script>
  <script src="brewing.js"></script>
  <script src="main.js"></script>
</body>
</html>
