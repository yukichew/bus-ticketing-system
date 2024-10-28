import { Document, Page, StyleSheet, Text, View } from '@react-pdf/renderer';
import React from 'react';

const Ticket = ({ booking }) => (
  <Document>
    <Page style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.heading}>Ticket Details</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.text}>Date: {booking.date}</Text>
        <Text style={styles.text}>Departure: {booking.departureLocation}</Text>
        <Text style={styles.text}>Arrival: {booking.arrivalLocation}</Text>
        <Text style={styles.text}>Operator: {booking.busOperator}</Text>
        <Text style={styles.text}>Status: {booking.status}</Text>
        <Text style={styles.text}>Trip No: {booking.tripNo}</Text>
      </View>
    </Page>
  </Document>
);

const styles = StyleSheet.create({
  page: {
    padding: 30,
  },
  section: {
    marginBottom: 10,
  },
  heading: {
    fontSize: 20,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 12,
    marginBottom: 5,
  },
});

export default Ticket;
