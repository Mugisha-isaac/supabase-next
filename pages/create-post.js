import { useState } from "react";
import {v4 as uuid} from 'uuid'
import {useRouter} from 'next/router'
import dynamic from 'next/dynamic'
import "easymde/dist/easymde.min.css"
import {supabase} from '../api'

