import { Tabs } from "expo-router";
import { colors } from "../../themes/colors";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
export default function TabLayout() {
    return (
        <Tabs
        >
            <Tabs.Screen 
                name='index' 
                options={
                    { 
                        title: 'Pokémon List',
                        headerShown: false,
                        tabBarIcon: ({ color, size, focused }) => (
                            <FontAwesome6
                              name="list"
                              color={color} 
                              size={size}
                            />
                        ),
                        tabBarActiveTintColor: colors.red_500
                    }
                }
                
                
            />
            <Tabs.Screen 
                name='fav'  
                options={
                    { 
                        title: 'Favourites List',
                        headerShown: false,
                        tabBarIcon: ({ color, size, focused }) => (
                            <FontAwesome6
                              name="heart"
                              color={color} 
                              size={size}
                            />
                        ),
                        tabBarActiveTintColor: colors.red_500
                    }
                } />
            <Tabs.Screen 
                name='settings'
                options={
                    { 
                        title: 'Settings',
                        headerShown: false,
                        tabBarIcon: ({ color, size, focused }) => (
                            <FontAwesome6
                              name="gear"
                              color={color} 
                              size={size}
                            />
                        ),
                        tabBarActiveTintColor: colors.red_500
                    }
                }   
            />
        </Tabs>
    );
}