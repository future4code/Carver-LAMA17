import * as bcrypt from "bcryptjs";


export class HashManager {

    public hash = async (text: string): Promise<any> => {
        const rounds = 12;
        const salt = await bcrypt.genSalt(rounds);
        const result = await bcrypt.hash(text, salt);
        return result;
    }

    public compare = async(text: string, hash: string): Promise<boolean> => {
        return await bcrypt.compare(text, hash);
    }

}
export default new HashManager()