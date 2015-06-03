angular.module('starter.controllers', [])

.controller('ItemsCtrl', function($scope, $ionicModal, $state, Items) {
  $scope.shouldShowReorder = false;
  $scope.items = Items.all();

  // Create and load the Modal
  $ionicModal.fromTemplateUrl('templates/modal-new-item.html', function(modal) {
    $scope.itemModal = modal;
  }, {
    scope: $scope,
    animation: 'slide-in-up'
  });

  //Cleanup the modal when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.itemModal.remove();
  });

  $scope.openNewItemModal = function() {
    $scope.itemModal.show();
  }

  $scope.closeNewItemModal = function() {
    $scope.itemModal.hide();
  }

  // Called when the form is submitted
  $scope.createItem = function(item) {
    timeStamp = new Date();
    $scope.items.push({
      id: timeStamp.valueOf(),
      name: item.name,
      done: false,
      createdAt: timeStamp.toLocaleString(),
      quantity: item.quantity
    });
    $scope.itemModal.hide();
    item.name = "";
    item.quantity = "";
  };

  // Reorder items
  $scope.moveItem = function(item, fromIndex, toIndex) {
    //Move the item in the array
    $scope.items.splice(fromIndex, 1);
    $scope.items.splice(toIndex, 0, item);
  };

  // Go to item detail page
  $scope.goToItemDetail = function(itemId) {
    $state.go('tab.item-detail', {itemId: itemId});
  };

  $scope.toggleDone = function(item) {
    Items.toggleDone(item);
  };

  $scope.remove = function(item) {
    Items.remove(item);
  };

})

.controller('ItemDetailCtrl', function($scope, $stateParams, Items) {
  $scope.item = Items.get($stateParams.itemId);
})

.controller('ReminderCtrl', function($scope) {

})

.controller('ChatsCtrl', function($scope, Chats) {
  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  }
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
