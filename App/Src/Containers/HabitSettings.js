

          <View>
            <Text>Private?</Text>
            <Switch value={this.state.isReminderChecked} onPress={() => { this.state.isReminderChecked ? this._removeReminder() : this._showTimePicker()}} />
          </View>
          <View style={{alignItems: 'center'}}>
            <Text style={{fontWeight: 'bold', color:'red'}}>Delete</Text>
            <Icon name='trash' onPress = {() => Alert.alert(
              'Delete Habit',
              'Are you sure you want to delete this Habit?',
              [
                {text: 'Cancel', onPress: () => console.log('Canceled Habit Delete!')},
                {text: 'OK', onPress: () => console.log('CREATE HABIT DELETE ROUTE')},
              ]
            )} />
          </View>