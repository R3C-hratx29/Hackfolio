import React from 'react';
import Heading from 'grommet/components/Heading';
import Label from 'grommet/components/Label';
import Card from 'grommet/components/Card';
import Box from 'grommet/components/Box';

const ProfileBox = () => {
    return (
        <Box
            flex={true}
            separator="all"
            contentPad="large"
            colorIndex="light-2"
        >
            <Card
                margin="medium"
                separator="all"
                contentPad="large"
                thumbnail="https://scontent-dft4-2.xx.fbcdn.net/v/t1.0-0/p206x206/12670_995538368000_1494101030_n.jpg?oh=2566aac7667d9786c1ad26b6c380e231&oe=5A6E717C"
                full="false"
                size="small"
                description="GitHub"
                colorIndex="light-1"
            >
                {/* <Heading>Rhiannon Le Parmentier</Heading>
                    <Label>Software Engineer & Austrian Beer Maid</Label> */}
            </Card>
        </Box>
    )
}
export default ProfileBox;

