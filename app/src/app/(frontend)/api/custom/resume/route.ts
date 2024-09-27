import { NextResponse } from 'next/server';
import { getPayloadHMR } from '@payloadcms/next/utilities';
import config from '@payload-config';
import { PrivateFile } from '@/payload-types';
import { BASE_URL } from '@/constants/app';
import { requireEnvVar } from '@/utils/env';
import { Users } from '@payload/collections/Users';
import { ResumeRequest } from '@/types/api/resume';
import { ErrorResonse } from '@/types/api/error';

const depth = 2;
const systemUserApiKey = requireEnvVar(process.env.PAYLOAD_SYSTEM_USER_API_KEY, 'PAYLOAD_SYSTEM_USER_API_KEY');

export const POST = async (request: Request) => {
  try {
    const body = (await request.json()) as ResumeRequest;
    const { password } = body;

    const payload = await getPayloadHMR({
      config,
    });

    const resumeGlobal = await payload.findGlobal({
      slug: 'resume',
      depth,
    });

    const validPasswords = resumeGlobal.passwords?.map((entry) => entry.password) || [];

    if (validPasswords.includes(password)) {
      const resumeFile = resumeGlobal.resumeFile as PrivateFile;
      const resumeFileUrl = resumeFile.url!;

      // Fetch the file as the system user
      const response = await fetch(`${BASE_URL}${resumeFileUrl}`, {
        headers: {
          Authorization: `${Users.slug} API-Key ${systemUserApiKey}`,
        },
      });

      if (!response.ok) {
        const errorResponse: ErrorResonse = {
          error: 'Failed to fetch resume file',
        };
        return NextResponse.json(errorResponse, { status: response.status });
      }

      const fileBuffer = await response.arrayBuffer();
      const filename = resumeFile.filename!;

      // Return the file as a response with proper headers for download
      return new NextResponse(fileBuffer, {
        status: 200,
        headers: {
          'Content-Type': 'application/pdf',
          'Content-Disposition': `attachment; filename="${filename}"`,
        },
      });
    } else {
      const errorResponse: ErrorResonse = { error: 'Access denied. Password is incorrect.' };
      return NextResponse.json(errorResponse, { status: 403 });
    }
  } catch (error) {
    const errorResponse: ErrorResonse = { error: 'Encountered error while processing resume request.' };
    console.error(errorResponse.error, error);
    return NextResponse.json(errorResponse, { status: 500 });
  }
};
