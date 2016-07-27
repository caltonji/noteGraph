(function() {

    angular
        .module("notes", ['ngCookies'])
        .controller("mainController", ["$scope", "$cookies", mainController]);

    function mainController($scope, $cookies) {
        /* static data */
        // $scope.tags = ["Ben Franklin", "Hackathon Ideas", "Art", "Recipes"];
        // $scope.tagsToNotes = {
        //     "Ben Franklin" : ["lorem ipsum", "and other stuff"], 
        //     "Hackathon Ideas" : ["more other stuff", "fuck I hate mock data"],
        //     "Art" : [],
        //     "Recipes" : []
        // };
        $scope.clearDatabase = function clearDatabase() {
            $cookies.put('notes-tags', null);
            $cookies.put('notes-tagsToNotes', null);
        }
        // $scope.clearDatabase();
        // get the data from store if it's there
        var tagsFromStore;
        var tagsToNotesFromStore;
        var tagsObj = $cookies.get('notes-tags');
        if (tagsObj) {
            tagsFromStore = JSON.parse(tagsObj);
        }
        var tagsToNotesObj = $cookies.get('notes-tagsToNotes');
        if (tagsToNotesObj) {
            tagsToNotesFromStore = JSON.parse(tagsToNotesObj);
        }
        $scope.tags = tagsFromStore || [];
        $scope.tagsToNotes = tagsToNotesFromStore || {};

        console.log({tags: $scope.tags, tagsToNotes: $scope.tagsToNotes});
        $scope.textareaPlaceholder = "Type a new idea... or an old one...";
        $scope.currentTag = $scope.tags[0];
        $scope.currentNote = "";

        $scope.submitNoteText = "Add a tag to get started"
        $scope.submitNoteEnabled = false;
        var enableSubmitNote = function enableSubmitNote() {
            $scope.submitNoteEnabled = true;
            $scope.submitNoteText = "Submit Note";
        }
        if ($scope.currentTag) {
            enableSubmitNote();
        }
        
        $scope.newTagPlaceholder = "Add tag";
        $scope.currentNewTag = "";
        $scope.newTagFocus = false;

        $scope.focused = function focused() {
            console.log("ford focus");
        }
        $scope.currentTagSize = Math.max($scope.newTagPlaceholder.length, $scope.currentNewTag.length);
        $scope.currentNewTagInputSize = function currentNewTagInputSize() {
            return Math.max($scope.newTagPlaceholder.length, $scope.currentNewTag.length);
        }
        $scope.submitTag = function submitTag($event) {
            var newTag = $scope.currentNewTag;
            if (newTag && newTag.length > 0 && $scope.tags.indexOf(newTag) == -1) {
                $scope.tags.push(newTag);
                $scope.tagsToNotes[newTag] = [];
                $scope.currentTag = newTag;
                $scope.currentNewTag = "";
                $event.target.firstChild.blur();
                enableSubmitNote();
                $scope.updateDatabase()
            }
        }

        /* functions */
        $scope.setCurrentTag = function setTag(index) {
            $scope.currentTag = $scope.tags[index];
        }

        $scope.submitNote = function submitNote() {
            if ($scope.currentTag && $scope.currentTag.length > 0) {
                // push current note and clear it
                $scope.tagsToNotes[$scope.currentTag].push($scope.currentNote);
                $scope.currentNote = "";
                var index = $scope.tags.indexOf($scope.currentTag);
                $scope.tags.splice(index, 1);
                $scope.tags.unshift($scope.currentTag);
                $scope.updateDatabase();
            }
        }

        $scope.updateDatabase = function updateDatabase() {
            $cookies.put('notes-tags', JSON.stringify($scope.tags));
            $cookies.put('notes-tagsToNotes', JSON.stringify($scope.tagsToNotes));
        }

    }

})();


