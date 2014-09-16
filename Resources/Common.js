/*
 * Found this method here: http://stackoverflow.com/questions/18405736/is-there-a-c-sharp-string-format-equivalent-in-javascript
 * It essentially behaves like C#'s string.Format().
 */
if (!String.prototype.format) {
  String.prototype.format = function() {
    var args = arguments;
    return this.replace(/{(\d+)}/g, function(match, number) {
      return typeof args[number] != 'undefined' ? args[number] : match;
    });
  };
}
