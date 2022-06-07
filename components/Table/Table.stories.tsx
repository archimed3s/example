import { Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';

import { TableWrapper } from './TableWrapper';

export default {
  title: 'Table',
  component: Table,
};

export const Striped = () => (
  <TableWrapper>
    <Table variant="striped">
      <Thead>
        <Tr>
          <Th>Game</Th>
          <Th>Date</Th>
          <Th>Bet</Th>
          <Th isNumeric>Win</Th>
        </Tr>
      </Thead>
      <Tbody>
        <Tr>
          <Td color="white">Rare Crystals</Td>
          <Td>2021/06/18</Td>
          <Td>$100</Td>
          <Td isNumeric>$1,000</Td>
        </Tr>
        <Tr>
          <Td color="white">Book of Dead</Td>
          <Td>2021/06/18</Td>
          <Td>$100</Td>
          <Td isNumeric>$0</Td>
        </Tr>
        <Tr>
          <Td color="white">Rare Crystals</Td>
          <Td>2021/06/18</Td>
          <Td>$100</Td>
          <Td isNumeric>$1,000</Td>
        </Tr>
        <Tr>
          <Td color="white">Book of Dead</Td>
          <Td>2021/06/18</Td>
          <Td>$100</Td>
          <Td isNumeric>$0</Td>
        </Tr>
        <Tr>
          <Td color="white">Rare Crystals</Td>
          <Td>2021/06/18</Td>
          <Td>$100</Td>
          <Td isNumeric>$1,000</Td>
        </Tr>
      </Tbody>
    </Table>
  </TableWrapper>
);
