function aiTarget () {
  if (previousHits.length === 1) {
    // check for valid adjacent cell
    var row = previousHits[0][0];
    var col = previousHits[0][1];
    if (!(
    testFire(row + 1, col, "human") ||
    testFire(row - 1, col, "human") ||
    testFire(row, col + 1, "human") ||
    testFire(row, col - 1, "human"))) {
      previousHits = [];
      return aiTarget();
    }
    // choose adjacent cell
    var direction = Math.floor(Math.random()*4);
    if (direction === 0) {
      var row = previousHits[0][0] + 1;
      var col = previousHits[0][1];
    } else if (direction === 1) {
      var row = previousHits[0][0] - 1;
      var col = previousHits[0][1];
    } else if (direction === 2) {
      var row = previousHits[0][0];
      var col = previousHits[0][1] + 1;
    } else if (direction === 3) {
      var row = previousHits[0][0];
      var col = previousHits[0][1] - 1;
    }
    // fire and return results
    var result = fire(row, col, "human");
    if (result === undefined) return aiTarget();
    if (result === "hit") {
      previousHits.push([row, col]);
    } else if (result !== "miss") {
      previousHits = [];
    }
    return result;

  } else if (previousHits.length > 1) {
    // continue firing in same direction, if possible
    var prev = previousHits.length - 1;
    var row = previousHits[prev][0] + previousHits[prev][0] - previousHits[prev - 1][0];
    var col = previousHits[prev][1] + previousHits[prev][1] - previousHits[prev - 1][1];
    if (testFire(row, col, "human")) {
      var result = fire(row, col, "human");
      if (result === "hit") {
        previousHits.push([row, col]);
      } else if (result !== "miss") {
        previousHits = [];
      }
      return result;

    } else {
      // attempt firing in other direction
      row = previousHits[0][0] + previousHits[0][0] - previousHits[1][0];
      row = previousHits[0][1] + previousHits[0][1] - previousHits[1][1];
      if (testFire(row, col, "human")) {
        var result = fire(row, col, "human");
        if (result === "hit") {
          previousHits.push([row, col]);
        } else if (result !== "miss") {
          previousHits = [];
        }
        return result;
      } else {
        previousHits = [];
        return aiTarget();
      }
    }
  } else {
    // random firing // convert row + col to even would be an improvement but wouldn't work with current targeting
    var row = random();
    var col = random();
    var result = fire(row, col, "human");
    if (result === undefined) return aiTarget();
    if (result === "hit") {
      previousHits.push([row, col]);
    }
    return result;
  }
}

// aiTarget alternative - any hit pushes valid surrounding cells to targetList[]
