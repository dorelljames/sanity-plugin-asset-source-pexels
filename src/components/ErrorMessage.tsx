import {Text, Card, Heading, Stack} from '@sanity/ui'

export const ErrorMessage = () => {
  return (
    <Card padding={[3, 3, 4]} radius={2} shadow={1} tone="critical">
      <Stack padding={4} space={[3, 3, 4, 5]}>
        <Heading align="center">Ooops, something went wrong!</Heading>
        <Text align="center">
          If the problem persists please see option on how to{' '}
          <a
            href="https://github.com/dorelljames/sanity-plugin-asset-source-pexels#configuration"
            target="_blank"
            rel="noreferrer"
          >
            use your own API key
          </a>
          .
        </Text>
      </Stack>
    </Card>
  )
}
