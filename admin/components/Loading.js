import loadingGif from '../../assets/loading.gif';
import { View, Image } from 'react-native';
export default function Loading() {
    return(<View style={styles.loadingContainer}>
        <Image source={loadingGif} />
    </View>);
    
}