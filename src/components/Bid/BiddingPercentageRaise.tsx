import { Dispatch, SetStateAction, useState } from 'react';
import {
  Box,
  Button,
  Divider,
  Flex,
  HStack,
  Tab,
  TabList,
  Tabs,
  Text,
  VStack,
} from '@chakra-ui/react';
import SpringModal from '../Modal/SpringModal';

interface RaiseProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

function BiddingPercentageRaise({ isOpen, setIsOpen }: RaiseProps) {
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabsChange = (index: number) => {
    setTabIndex(index);
  };
  return (
    <SpringModal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Flex
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        width="100%"
        bg="#222222"
        height="100%"
      >
        <HStack>
          <Text padding="12px" color="#FCFCFD">
            가격
          </Text>
          <Text padding="12px" color="#FCFCFD">
            30000
          </Text>
        </HStack>
        <Box bg="#161617" height="12px" width="100%" />
        <HStack>
          <Text padding="12px" color="#FCFCFD">
            시간
          </Text>
          <Text padding="12px" color="#FCFCFD">
            00:00:12
          </Text>
        </HStack>
        <Divider borderColor="#3D3D3D" />
        <VStack gap="12px" padding="12px">
          <HStack gap="12px" width="100%" justifyContent="space-around">
            <Tabs
              variant="unstyled"
              index={tabIndex}
              onChange={handleTabsChange}
            >
              <TabList gap={2}>
                <Tab
                  borderRadius="5px"
                  bg="#C3BECF"
                  _selected={{ color: '#FCFCFD', bg: '#886CB5' }}
                >
                  10 %
                </Tab>
                <Tab
                  borderRadius="5px"
                  bg="#C3BECF"
                  _selected={{ color: '#FCFCFD', bg: '#886CB5' }}
                >
                  20 %
                </Tab>
                <Tab
                  borderRadius="5px"
                  bg="#C3BECF"
                  _selected={{ color: '#FCFCFD', bg: '#886CB5' }}
                >
                  30 %
                </Tab>
              </TabList>
            </Tabs>
          </HStack>
          <HStack width="100%" justifyContent="space-around">
            <Button
              // onClick={handleSendBid}
              height={{ base: '30px', sm: '45px' }}
              colorScheme="mong"
              color="#FDFDFC"
              zIndex={2}
            >
              입찰하기
            </Button>
            <Button
              onClick={() => setIsOpen(!isOpen)}
              height={{ base: '30px', sm: '45px' }}
              colorScheme="mongCancle"
              color="#757575"
              zIndex={2}
            >
              취소하기
            </Button>
          </HStack>
        </VStack>
      </Flex>
    </SpringModal>
  );
}

export default BiddingPercentageRaise;
