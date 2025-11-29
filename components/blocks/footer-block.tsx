import { Container, SimpleGrid, Text, Link, Box } from "@chakra-ui/react"
import { FaLinkedin, FaTwitter } from "react-icons/fa"

const FooterBlock = () => {
  const socialLinks = {
    linkedin: "https://www.linkedin.com/in/myriam-aniba-ai/",
    twitter: "https://twitter.com/MyriamAI7",
  }

  return (
    <Box bg="gray.800" color="white" py={10}>
      <Container maxW="container.xl">
        <SimpleGrid columns={[1, null, 3]} spacing={8}>
          <Box>
            <Text fontWeight="bold" fontSize="lg" mb={2}>
              About
            </Text>
            <Text>AI Enthusiast | Full Stack Developer | Cloud Computing | DevOps</Text>
          </Box>
          <Box>
            <Text fontWeight="bold" fontSize="lg" mb={2}>
              Links
            </Text>
            <Link href="#" display="block" mb={1}>
              Home
            </Link>
            <Link href="#" display="block" mb={1}>
              Projects
            </Link>
            <Link href="#" display="block" mb={1}>
              Blog
            </Link>
          </Box>
          <Box>
            <Text fontWeight="bold" fontSize="lg" mb={2}>
              Social
            </Text>
            <Link href={socialLinks.linkedin} isExternal display="flex" alignItems="center" mb={1}>
              <FaLinkedin size="20px" mr={2} />
              LinkedIn
            </Link>
            <Link href={socialLinks.twitter} isExternal display="flex" alignItems="center" mb={1}>
              <FaTwitter size="20px" mr={2} />
              Twitter
            </Link>
          </Box>
        </SimpleGrid>
        <Text mt={8} textAlign="center" fontSize="sm">
          &copy; {new Date().getFullYear()} Myriam Aniba. All rights reserved.
        </Text>
      </Container>
    </Box>
  )
}

export default FooterBlock
