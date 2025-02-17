import { Loader, Text } from "@mantine/core";

export default function LoadingMain({text = 'Loading'}) {
    return (
        <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            justifyContent: 'center', 
            alignItems: 'center', 
            height: '100vh' 
        }}>
            <Text p='md' size="xl">{text}</Text>
            <Loader color="blue" size="lg" type="bars" />
        </div>
    );
    }