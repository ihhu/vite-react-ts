import { OssTokenInfo } from '@/interface';
import { getOssToken } from '@/apis';

/**
 * 上传阿里云文件操作
 *
 * @export
 * @param {array} files 文件列表
 * @param {object} aliCloudStorageToken 阿里云 相关配置
 * @param {string} module 模块
 * @returns {Promise}
 */
let token: Partial<OssTokenInfo> | null = {};
let updateTime = Number.MIN_VALUE;

function checkTime() {
    return Date.now() - updateTime < 1000 * 60;
}

async function getToken() {
    // 添加一分钟的token缓存检测， 防止并发上传文件时多次请求token接口
    if (token?.aliCloudAccessKeyId && token?.aliCloudAccessKeySecret && checkTime()) {
        return token;
    }
    try {
        token = await getOssToken();
        updateTime = Date.now();
        return token;
    } catch (error) {
        return null;
    }
}

// 获取上传文件数据
export function getUploadFileInfo(files: File[], ossStoragePath: string, module: string) {
    return files.map(item => {
        const _now = new Date();
        const date = [_now.getFullYear(), `${_now.getMonth() + 1}`.padStart(2, '0'), `${_now.getDate()}`.padStart(2, '0')].join('');
        const path = [`${ossStoragePath}${module}`, date].join('/');
        const names = item.name.split('.');
        let name = [[names[0], +_now].join('_'), names[names.length - 1]].join('.');
        name = [path, name].join('/');
        return { name, raw: item };
    });
}

interface uploadOptions {
    module?: string;
    usePrivate?: boolean;
}

export async function uploadFile(files: File[], uploadOptions: uploadOptions = {}) {
    const module = uploadOptions.module ?? 'requirement';
    const usePrivate = uploadOptions.usePrivate ?? false;
    const aliCloudStorageToken = await getToken();
    if (!aliCloudStorageToken) {
        return Promise.reject({ message: 'token 获取失败' });
    }
    const { ossStoragePath, aliCloudAccessKeyId, aliCloudAccessKeySecret, aliCloudSecurityToken, aliCloudExpireTime, regionId, ossEndpoint, privateBucketName, publicBucketName, publicStorageDomainUrl } = aliCloudStorageToken;

    const uploadFiles = getUploadFileInfo(files, ossStoragePath ?? '', module);
    console.log(uploadFiles);

    if (!uploadFiles.length) {
        return [];
    }

    // TODO 需要install ali-oss模块
    /* const OSS = await import('ali-oss');

    try {
        const client = new OSS.default({
            endpoint: ossEndpoint,
            region: regionId,
            accessKeyId: aliCloudAccessKeyId ?? '',
            accessKeySecret: aliCloudAccessKeySecret ?? '',
            bucket: usePrivate ? privateBucketName: publicBucketName,
            stsToken: aliCloudSecurityToken,
        });
        const result = await Promise.all(
            uploadFiles.map(data => {
                return client.put(`${data.name}`, data.raw, {
                    mime: data.raw.type,
                }).then(result => {
                    return {
                        url: `${result.name}`,
                        name: result.name,
                        file: data.raw
                    };
                });
            })
        );
        return result;

    } catch (error) {
        token = null;
        return Promise.reject(error);

    } */
}
