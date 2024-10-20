import { Box, Flex, Image, Text, Link } from '@chakra-ui/react'

export default function Navigator() {
  return (
    <Box
      position="fixed"
      bottom={0}
      left={0}
      right={0}
      bg="white"
      shadow="lg"
      borderTop="1px solid"
      borderColor="gray.200"
    >
      <Flex justify="space-around" align="center" p={2}>
        <Link href="#">
          <Flex direction="column" align="center">
            <Image 
            src='../../public/images/home_icon.png'
            alt="홈"
            boxSize="24px"
            />
            <Text fontSize="sm">홈</Text>
          </Flex>
        </Link> 

        <Link href="#">
          <Flex direction="column" align="center">
          <Image 
            src='../../public/images/list_icon.png'
            alt="경매 리스트"
            boxSize="24px"
            />
            <Text fontSize="sm">경매 리스트</Text>
          </Flex>
        </Link>

        <Link href="#">
          <Flex direction="column" align="center">
          <Image 
            src='../../public/images/add_icon.png'
            alt="새로운 경매"
            boxSize="24px"
            />
            <Text fontSize="sm">새로운 경매</Text>
          </Flex>
        </Link>

        <Link href="#">
          <Flex direction="column" align="center">
          <Image 
            src='../../public/images/participant_icon.png'
            alt="참여중 경매"
            boxSize="24px"
            />
            <Text fontSize="sm">참여중 경매</Text>
          </Flex>
        </Link>

        <Link href="#">
          <Flex direction="column" align="center">
          <Image 
            src='../../public/images/mypage_icon.png'
            alt="마이페이지"
            boxSize="24px"
            />
            <Text fontSize="sm">마이페이지</Text>
          </Flex>
        </Link>
      </Flex>
    </Box>
  )
}