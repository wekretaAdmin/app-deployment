import * as React from 'react';
import {View, Text} from 'react-native';
import {List} from 'react-native-paper';
import FontStyle from '../../../../assets/theme/FontStyle';

const MyComponent = () => (
  <List.AccordionGroup>
    <List.Accordion
      style={{
        backgroundColor: 'yellow',
        height: 100,
        alignItems: 'center',
        justifyContent: 'center',
      }}
      title="Accordion 1"
      id="1">
      <View>
        <Text style={[FontStyle.heading]}>jcndjks</Text>
      </View>
    </List.Accordion>
    <List.Accordion title="Accordion 2" id="2">
      <List.Item title="Item 2" />
    </List.Accordion>
    <View>
      <Text>
        List.Accordion can be wrapped because implementation uses React.Context.
      </Text>
      <List.Accordion title="Accordion 3" id="3">
        <List.Item title="Item 3" />
      </List.Accordion>
    </View>
  </List.AccordionGroup>
);

export default MyComponent;
